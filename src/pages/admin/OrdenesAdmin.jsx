import { useState, Fragment } from 'react';
import AdminLayout from '../../components/AdminLayout.jsx';
import useTitulo from '../../utils/useTitulo.js';
import { obtenerOrdenes, actualizarEstadoOrden } from '../../data/ordenes.js';

export default function OrdenesAdmin() {
  useTitulo('Órdenes - Panel de administrador');

  const [ordenes, setOrdenes] = useState(() => obtenerOrdenes());
  const [abierta, setAbierta] = useState(null);

  const handleEstado = (id, estado) => {
    actualizarEstadoOrden(id, estado);
    setOrdenes(obtenerOrdenes());
  };

  return (
    <AdminLayout titulo="Órdenes y boletas">
      <div className="table-responsive bg-white rounded">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              <th>Código</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Boleta</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-3">Todavía no hay órdenes.</td>
              </tr>
            )}
            {ordenes.map(o => (
              <Fragment key={o.id}>
                <tr>
                  <td>{o.codigo}</td>
                  <td>{new Date(o.fecha).toLocaleDateString('es-CL')}</td>
                  <td>{o.cliente.nombre} {o.cliente.apellido}</td>
                  <td>${o.total.toLocaleString('es-CL')}</td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={o.estado}
                      onChange={e => handleEstado(o.id, e.target.value)}
                    >
                      <option value="pagada">Pagada</option>
                      <option value="error">Error</option>
                    </select>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-dark"
                      onClick={() => setAbierta(abierta === o.id ? null : o.id)}
                    >
                      {abierta === o.id ? 'Ocultar' : 'Ver detalle'}
                    </button>
                  </td>
                </tr>
                {abierta === o.id && (
                  <tr>
                    <td colSpan="6">
                      <p className="mb-1">
                        <strong>Correo:</strong> {o.cliente.correo}
                      </p>
                      <p className="mb-1">
                        <strong>Dirección:</strong> {o.direccion.calle} {o.direccion.departamento},{' '}
                        {o.direccion.comuna}, {o.direccion.region}
                      </p>
                      <ul className="mb-1">
                        {o.items.map((item, i) => (
                          <li key={i}>
                            {item.cantidad} x {item.nombre} (${item.precio.toLocaleString('es-CL')})
                            {item.mensaje ? ` - "${item.mensaje}"` : ''}
                          </li>
                        ))}
                      </ul>
                      <p className="mb-0">
                        <strong>Descuento:</strong> ${o.descuento.toLocaleString('es-CL')} -{' '}
                        <strong>Total:</strong> ${o.total.toLocaleString('es-CL')}
                      </p>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
