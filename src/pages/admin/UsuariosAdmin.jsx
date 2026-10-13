import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout.jsx';
import useTitulo from '../../utils/useTitulo.js';
import {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} from '../../data/usuarios.js';
import { obtenerOrdenesPorUsuario } from '../../data/ordenes.js';
import { obtenerSesion } from '../../utils/sesion.js';
import { validarRut } from '../../utils/validarRut.js';

const formVacio = {
  rut: '',
  nombre: '',
  apellido: '',
  correo: '',
  contrasena: '',
  rol: 'cliente'
};

export default function UsuariosAdmin() {
  useTitulo('Usuarios - Panel de administrador');

  const [usuarios, setUsuarios] = useState(() => obtenerUsuarios());
  const [form, setForm] = useState(formVacio);
  const [editandoId, setEditandoId] = useState(null);
  const [historialDe, setHistorialDe] = useState(null);

  const handleChange = campo => e => setForm({ ...form, [campo]: e.target.value });

  const limpiar = () => {
    setForm(formVacio);
    setEditandoId(null);
  };

  const refrescar = () => setUsuarios(obtenerUsuarios());

  const handleSubmit = e => {
    e.preventDefault();

    if (editandoId === null) {
      if (!validarRut(form.rut)) {
        alert('El RUT ingresado no es válido.');
        return;
      }
      const creado = crearUsuario({
        rut: form.rut.trim(),
        nombre: form.nombre.trim(),
        apellido: form.apellido.trim(),
        correo: form.correo.trim(),
        contrasena: form.contrasena,
        rol: form.rol
      });
      if (!creado) {
        alert('Ya existe un usuario con ese correo o RUT.');
        return;
      }
    } else {
      actualizarUsuario(editandoId, {
        nombre: form.nombre.trim(),
        apellido: form.apellido.trim(),
        contrasena: form.contrasena,
        rol: form.rol
      });
    }

    refrescar();
    limpiar();
  };

  const handleEditar = u => {
    setForm({
      rut: u.rut,
      nombre: u.nombre,
      apellido: u.apellido,
      correo: u.correo,
      contrasena: u.contrasena,
      rol: u.rol
    });
    setEditandoId(u.id);
  };

  const handleEliminar = u => {
    const sesion = obtenerSesion();
    if (sesion && sesion.id === u.id) {
      alert('No puedes eliminar tu propio usuario.');
      return;
    }
    if (confirm(`¿Eliminar al usuario "${u.correo}"?`)) {
      eliminarUsuario(u.id);
      refrescar();
      if (editandoId === u.id) limpiar();
      if (historialDe && historialDe.id === u.id) setHistorialDe(null);
    }
  };

  const ordenes = historialDe ? obtenerOrdenesPorUsuario(historialDe.correo) : [];

  return (
    <AdminLayout titulo="Usuarios">
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h3 className="h5">{editandoId === null ? 'Nuevo usuario' : 'Editar usuario'}</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label className="form-label" htmlFor="rutUsuario">RUT</label>
                  <input
                    className="form-control"
                    id="rutUsuario"
                    type="text"
                    placeholder="12345678-5"
                    required
                    disabled={editandoId !== null}
                    value={form.rut}
                    onChange={handleChange('rut')}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label" htmlFor="nombreUsuario">Nombre</label>
                  <input
                    className="form-control"
                    id="nombreUsuario"
                    type="text"
                    required
                    value={form.nombre}
                    onChange={handleChange('nombre')}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label" htmlFor="apellidoUsuario">Apellido</label>
                  <input
                    className="form-control"
                    id="apellidoUsuario"
                    type="text"
                    required
                    value={form.apellido}
                    onChange={handleChange('apellido')}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label" htmlFor="correoUsuario">Correo</label>
                  <input
                    className="form-control"
                    id="correoUsuario"
                    type="email"
                    required
                    disabled={editandoId !== null}
                    value={form.correo}
                    onChange={handleChange('correo')}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label" htmlFor="contrasenaUsuario">Contraseña</label>
                  <input
                    className="form-control"
                    id="contrasenaUsuario"
                    type="text"
                    required
                    value={form.contrasena}
                    onChange={handleChange('contrasena')}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="rolUsuario">Rol</label>
                  <select
                    className="form-select"
                    id="rolUsuario"
                    value={form.rol}
                    onChange={handleChange('rol')}
                  >
                    <option value="cliente">Cliente</option>
                    <option value="admin">Administrador</option>
                  </select>
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
                  <th>RUT</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(u => (
                  <tr key={u.id}>
                    <td>{u.rut}</td>
                    <td>{u.nombre} {u.apellido}</td>
                    <td>{u.correo}</td>
                    <td>{u.rol}</td>
                    <td className="text-nowrap">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-dark me-2"
                        onClick={() => handleEditar(u)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => setHistorialDe(u)}
                      >
                        Historial
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleEliminar(u)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {historialDe && (
            <div className="card mt-3">
              <div className="card-body">
                <h3 className="h5">Historial de compras de {historialDe.nombre} {historialDe.apellido}</h3>
                {ordenes.length === 0 ? (
                  <p className="mb-0">Este usuario todavía no tiene compras.</p>
                ) : (
                  <ul className="mb-0">
                    {ordenes.map(o => (
                      <li key={o.id}>
                        {o.codigo} - {new Date(o.fecha).toLocaleDateString('es-CL')} - $
                        {o.total.toLocaleString('es-CL')} ({o.estado})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
