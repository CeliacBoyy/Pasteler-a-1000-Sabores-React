import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import useTitulo from '../utils/useTitulo.js';
import estilos from '../styles/checkout.css?inline';

export default function PagoExitoso() {
  useTitulo('Compra Exitosa - Pastelería 1000 Sabores');
  const [orden, setOrden] = useState(null);

  useEffect(() => {
    const ordenGuardada = JSON.parse(localStorage.getItem('ultimaOrden'));
    if (ordenGuardada) setOrden(ordenGuardada);
  }, []);

  if (!orden) return null;

  return (
    <>
      <style>{estilos}</style>
      <Header />

      <main className="contenedor-checkout">
        <div className="card-checkout text-center">
          <div className="alerta-exito">
            ✔ Se ha realizado la compra con éxito. <strong>nro {orden.nroOrden}</strong>
          </div>

          <h3 className="subtitulo-checkout">Detalle de la compra</h3>

          <div className="datos-resumen">
            <p><strong>Cliente:</strong> {orden.cliente.nombre} {orden.cliente.apellidos} ({orden.cliente.correo})</p>
            <p><strong>Dirección:</strong> {orden.cliente.calle}, {orden.cliente.departamento} - {orden.cliente.comuna}, {orden.cliente.region}</p>
            {orden.cliente.indicaciones && <p><strong>Indicaciones:</strong> {orden.cliente.indicaciones}</p>}
          </div>

          <table className="tabla-checkout">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {orden.items.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.nombre} <br /><small>{item.mensaje}</small></td>
                  <td>{item.cantidad}</td>
                  <td>{item.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="total-final">Total pagado: ${orden.total.toLocaleString('es-CL')} CLP</h3>
          <p className="mensaje-agradecimiento">¡Gracias por tu compra! Te enviaremos un correo con el comprobante pronto.</p>

          <Link to="/" className="btn-pagar" style={{ display: 'inline-block', textDecoration: 'none', width: 'auto', padding: '12px 30px' }}>
            Volver a la Tienda
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}