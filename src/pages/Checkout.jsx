import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import useTitulo from '../utils/useTitulo.js';
import estilos from '../styles/checkout.css?inline';

export default function Checkout() {
  useTitulo('Checkout - Pastelería 1000 Sabores');
  const navigate = useNavigate();

  const [carrito, setCarrito] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    calle: '',
    departamento: '',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Cerrillos',
    indicaciones: ''
  });

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(items);

    // Auto-completar datos si el usuario ya inició sesión
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioLogueado) {
      setFormData(prev => ({
        ...prev,
        nombre: usuarioLogueado.nombre || '',
        correo: usuarioLogueado.correo || ''
      }));
    }
  }, []);

  const extraerNumero = (texto) => parseInt(texto.replace(/[^0-9]/g, '')) || 0;

  const totalPagar = carrito.reduce((acc, item) => acc + (extraerNumero(item.precio) * item.cantidad), 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePagar = (e) => {
    e.preventDefault();
    if (carrito.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    const orden = {
      nroOrden: `#2026${Math.floor(1000 + Math.random() * 9000)}`,
      cliente: formData,
      items: carrito,
      total: totalPagar
    };

    localStorage.setItem('ultimaOrden', JSON.stringify(orden));

    // Simulación de pago (90% éxito, 10% error)
    if (Math.random() > 0.1) {
      localStorage.removeItem('carrito');
      navigate('/pago-exitoso');
    } else {
      navigate('/pago-error');
    }
  };

  return (
    <>
      <style>{estilos}</style>
      <Header />

      <main className="contenedor-checkout">
        <div className="card-checkout">
          <div className="header-checkout">
            <h2>Carrito de compra</h2>
            <span className="badge-total">Total a pagar: ${totalPagar.toLocaleString('es-CL')} CLP</span>
          </div>

          {/* Resumen de items */}
          <table className="tabla-checkout">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item, idx) => {
                const precioNum = extraerNumero(item.precio);
                return (
                  <tr key={idx}>
                    <td>
                      <strong>{item.nombre}</strong>
                      <br /><small>{item.mensaje}</small>
                    </td>
                    <td>${precioNum.toLocaleString('es-CL')}</td>
                    <td>{item.cantidad}</td>
                    <td>${(precioNum * item.cantidad).toLocaleString('es-CL')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <form onSubmit={handlePagar}>
            <h3 className="subtitulo-checkout">Información del cliente</h3>
            <div className="grid-2">
              <div className="campo">
                <label>Nombre *</label>
                <input type="text" name="nombre" required value={formData.nombre} onChange={handleChange} />
              </div>
              <div className="campo">
                <label>Apellidos *</label>
                <input type="text" name="apellidos" required value={formData.apellidos} onChange={handleChange} />
              </div>
            </div>
            <div className="campo">
              <label>Correo electrónico *</label>
              <input type="email" name="correo" required value={formData.correo} onChange={handleChange} />
            </div>

            <h3 className="subtitulo-checkout">Dirección de entrega de los productos</h3>
            <div className="grid-2">
              <div className="campo">
                <label>Calle *</label>
                <input type="text" name="calle" required placeholder="Ej: Av. Principal 123" value={formData.calle} onChange={handleChange} />
              </div>
              <div className="campo">
                <label>Departamento (opcional)</label>
                <input type="text" name="departamento" placeholder="Ej: Depto 603" value={formData.departamento} onChange={handleChange} />
              </div>
            </div>

            <div className="grid-2">
              <div className="campo">
                <label>Región</label>
                <select name="region" value={formData.region} onChange={handleChange}>
                  <option>Región Metropolitana de Santiago</option>
                  <option>Valparaíso</option>
                  <option>Biobío</option>
                </select>
              </div>
              <div className="campo">
                <label>Comuna</label>
                <select name="comuna" value={formData.comuna} onChange={handleChange}>
                  <option>Cerrillos</option>
                  <option>Maipú</option>
                  <option>Santiago Centro</option>
                  <option>Providencia</option>
                </select>
              </div>
            </div>

            <div className="campo">
              <label>Indicaciones para la entrega (opcional)</label>
              <textarea name="indicaciones" placeholder="Ej: Dejar con el conserje si no hay respuesta." value={formData.indicaciones} onChange={handleChange}></textarea>
            </div>

            <button type="submit" className="btn-pagar">
              Pagar ahora ${totalPagar.toLocaleString('es-CL')} CLP
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}