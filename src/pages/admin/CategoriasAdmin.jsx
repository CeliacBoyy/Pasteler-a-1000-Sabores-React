import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout.jsx';
import useTitulo from '../../utils/useTitulo.js';
import {
  obtenerCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
} from '../../data/categorias.js';
import { obtenerProductosPorCategoria, actualizarProducto } from '../../data/productos.js';

const formVacio = { nombre: '', descripcion: '' };

export default function CategoriasAdmin() {
  useTitulo('Categorías - Panel de administrador');

  const [categorias, setCategorias] = useState(() => obtenerCategorias());
  const [form, setForm] = useState(formVacio);
  const [editandoId, setEditandoId] = useState(null);

  const handleChange = campo => e => setForm({ ...form, [campo]: e.target.value });

  const limpiar = () => {
    setForm(formVacio);
    setEditandoId(null);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const datos = { nombre: form.nombre.trim(), descripcion: form.descripcion.trim() };

    if (editandoId === null) {
      if (!crearCategoria(datos)) {
        alert('Ya existe una categoría con ese nombre.');
        return;
      }
    } else {
      const original = categorias.find(c => c.id === editandoId);
      const otra = categorias.find(
        c => c.id !== editandoId && c.nombre.toLowerCase() === datos.nombre.toLowerCase()
      );
      if (otra) {
        alert('Ya existe una categoría con ese nombre.');
        return;
      }
      if (original.nombre !== datos.nombre) {
        obtenerProductosPorCategoria(original.nombre).forEach(p => {
          actualizarProducto(p.codigo, { categoria: datos.nombre });
        });
      }
      actualizarCategoria(editandoId, datos);
    }

    setCategorias(obtenerCategorias());
    limpiar();
  };

  const handleEditar = categoria => {
    setForm({ nombre: categoria.nombre, descripcion: categoria.descripcion });
    setEditandoId(categoria.id);
  };

  const handleEliminar = categoria => {
    if (obtenerProductosPorCategoria(categoria.nombre).length > 0) {
      alert('No se puede eliminar: hay productos en esta categoría.');
      return;
    }
    if (confirm(`¿Eliminar la categoría "${categoria.nombre}"?`)) {
      eliminarCategoria(categoria.id);
      setCategorias(obtenerCategorias());
      if (editandoId === categoria.id) limpiar();
    }
  };

  return (
    <AdminLayout titulo="Categorías">
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h3 className="h5">{editandoId === null ? 'Nueva categoría' : 'Editar categoría'}</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="nombreCategoria">Nombre</label>
                  <input
                    className="form-control"
                    id="nombreCategoria"
                    type="text"
                    required
                    value={form.nombre}
                    onChange={handleChange('nombre')}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="descripcionCategoria">Descripción</label>
                  <input
                    className="form-control"
                    id="descripcionCategoria"
                    type="text"
                    value={form.descripcion}
                    onChange={handleChange('descripcion')}
                  />
                </div>
                <button type="submit" className="btn btn-dark me-2">
                  {editandoId === null ? 'Guardar' : 'Actualizar'}
                </button>
                {editandoId !== null && (
                  <button type="button" className="btn btn-outline-secondary" onClick={limpiar}>
                    Cancelar
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="table-responsive bg-white rounded">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Productos</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map(c => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.nombre}</td>
                    <td>{c.descripcion}</td>
                    <td>{obtenerProductosPorCategoria(c.nombre).length}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-dark me-2"
                        onClick={() => handleEditar(c)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleEliminar(c)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
