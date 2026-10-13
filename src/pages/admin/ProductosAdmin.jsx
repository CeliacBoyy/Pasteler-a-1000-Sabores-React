import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout.jsx';
import useTitulo from '../../utils/useTitulo.js';
import {
  obtenerProductos,
  obtenerProductosCriticos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from '../../data/productos.js';
import { obtenerCategorias } from '../../data/categorias.js';

const formVacio = {
  codigo: '',
  nombre: '',
  categoria: '',
  descripcion: '',
  precio: '',
  stock: '',
  stockCritico: '5',
  oferta: false,
  precioOferta: ''
};

const formatoPrecio = n => `$${n.toLocaleString('es-CL')}`;

export default function ProductosAdmin() {
  useTitulo('Productos - Panel de administrador');

  const [productos, setProductos] = useState(() => obtenerProductos());
  const [form, setForm] = useState(formVacio);
  const [editando, setEditando] = useState(null);
  const [soloCriticos, setSoloCriticos] = useState(false);

  const categorias = obtenerCategorias();
  const lista = soloCriticos ? productos.filter(p => p.stock <= p.stockCritico) : productos;

  const handleChange = campo => e => setForm({ ...form, [campo]: e.target.value });

  const limpiar = () => {
    setForm(formVacio);
    setEditando(null);
  };

  const refrescar = () => setProductos(obtenerProductos());

  const handleSubmit = e => {
    e.preventDefault();

    const datos = {
      nombre: form.nombre.trim(),
      categoria: form.categoria,
      descripcion: form.descripcion.trim(),
      precio: Number(form.precio),
      stock: Number(form.stock),
      stockCritico: Number(form.stockCritico),
      oferta: form.oferta,
      precioOferta: form.oferta ? Number(form.precioOferta) : null
    };

    if (datos.oferta && datos.precioOferta >= datos.precio) {
      alert('El precio de oferta debe ser menor al precio normal.');
      return;
    }

    if (editando === null) {
      const creado = crearProducto({ codigo: form.codigo.trim(), ...datos });
      if (!creado) {
        alert('Ya existe un producto con ese código.');
        return;
      }
    } else {
      actualizarProducto(editando, datos);
    }

    refrescar();
    limpiar();
  };

  const handleEditar = p => {
    setForm({
      codigo: p.codigo,
      nombre: p.nombre,
      categoria: p.categoria,
      descripcion: p.descripcion,
      precio: String(p.precio),
      stock: String(p.stock),
      stockCritico: String(p.stockCritico),
      oferta: p.oferta,
      precioOferta: p.precioOferta === null ? '' : String(p.precioOferta)
    });
    setEditando(p.codigo);
  };

  const handleEliminar = p => {
    if (confirm(`¿Eliminar el producto "${p.nombre}"?`)) {
      eliminarProducto(p.codigo);
      refrescar();
      if (editando === p.codigo) limpiar();
    }
  };

  return (
    <AdminLayout titulo="Productos">
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h3 className="h5">{editando === null ? 'Nuevo producto' : 'Editar producto'}</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label className="form-label" htmlFor="codigoProducto">Código</label>
                  <input
                    className="form-control"
                    id="codigoProducto"
                    type="text"
                    required
                    disabled={editando !== null}
                    value={form.codigo}
                    onChange={handleChange('codigo')}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label" htmlFor="nombreProducto">Nombre</label>
                  <input
                    className="form-control"
                    id="nombreProducto"
                    type="text"
                    required
                    value={form.nombre}
                    onChange={handleChange('nombre')}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label" htmlFor="categoriaProducto">Categoría</label>
                  <select
                    className="form-select"
                    id="categoriaProducto"
                    required
                    value={form.categoria}
                    onChange={handleChange('categoria')}
                  >
                    <option value="">Selecciona una categoría</option>
                    {categorias.map(c => (
                      <option key={c.id} value={c.nombre}>{c.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label" htmlFor="descripcionProducto">Descripción</label>
                  <textarea
                    className="form-control"
                    id="descripcionProducto"
                    rows="3"
                    value={form.descripcion}
                    onChange={handleChange('descripcion')}
                  />
                </div>
                <div className="row g-2 mb-2">
                  <div className="col-4">
                    <label className="form-label" htmlFor="precioProducto">Precio</label>
                    <input
                      className="form-control"
                      id="precioProducto"
                      type="number"
                      min="0"
                      required
                      value={form.precio}
                      onChange={handleChange('precio')}
                    />
                  </div>
                  <div className="col-4">
                    <label className="form-label" htmlFor="stockProducto">Stock</label>
                    <input
                      className="form-control"
                      id="stockProducto"
                      type="number"
                      min="0"
                      required
                      value={form.stock}
                      onChange={handleChange('stock')}
                    />
                  </div>
                  <div className="col-4">
                    <label className="form-label" htmlFor="criticoProducto">Crítico</label>
                    <input
                      className="form-control"
                      id="criticoProducto"
                      type="number"
                      min="0"
                      required
                      value={form.stockCritico}
                      onChange={handleChange('stockCritico')}
                    />
                  </div>
                </div>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    id="ofertaProducto"
                    type="checkbox"
                    checked={form.oferta}
                    onChange={e => setForm({ ...form, oferta: e.target.checked })}
                  />
                  <label className="form-check-label" htmlFor="ofertaProducto">En oferta</label>
                </div>
                {form.oferta && (
                  <div className="mb-2">
                    <label className="form-label" htmlFor="precioOfertaProducto">Precio de oferta</label>
                    <input
                      className="form-control"
                      id="precioOfertaProducto"
                      type="number"
                      min="0"
                      required
                      value={form.precioOferta}
                      onChange={handleChange('precioOferta')}
                    />
                  </div>
                )}
                <button type="submit" className="btn btn-dark me-2 mt-2">
                  {editando === null ? 'Guardar' : 'Actualizar'}
                </button>
                {editando !== null && (
                  <button type="button" className="btn btn-outline-secondary mt-2" onClick={limpiar}>
                    Cancelar
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              id="soloCriticos"
              type="checkbox"
              checked={soloCriticos}
              onChange={e => setSoloCriticos(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="soloCriticos">
              Mostrar solo productos críticos ({obtenerProductosCriticos().length})
            </label>
          </div>

          <div className="table-responsive bg-white rounded">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Oferta</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {lista.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-3">No hay productos para mostrar.</td>
                  </tr>
                )}
                {lista.map(p => (
                  <tr key={p.codigo}>
                    <td>{p.codigo}</td>
                    <td>{p.nombre}</td>
                    <td>{p.categoria}</td>
                    <td>{formatoPrecio(p.precio)}</td>
                    <td>
                      {p.stock}
                      {p.stock <= p.stockCritico && (
                        <span className="badge text-bg-danger ms-1">Crítico</span>
                      )}
                    </td>
                    <td>{p.oferta ? formatoPrecio(p.precioOferta) : '-'}</td>
                    <td className="text-nowrap">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-dark me-2"
                        onClick={() => handleEditar(p)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleEliminar(p)}
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
