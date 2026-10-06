import { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import useTitulo from '../utils/useTitulo.js';
import { obtenerCarrito, guardarCarrito } from '../utils/carritoStorage.js';
import estiloInicio from '../styles/inicio.css?inline';
import estiloCarrito from '../styles/carrito.css?inline';

// Lista de cupones válidos
const cuponesValidos = {
  FELICES50: 0.5, // 50% de descuento
  DULCE10: 0.1, // 10% de descuento
  MILSABORES: 0.15 // 15% de descuento
};

function formatearCLP(numero) {
  return `$${numero.toLocaleString('es-CL')} CLP`;
}

export default function Carrito() {
  useTitulo('Carrito - Pasteleria mil sabores');

  const [items, setItems] = useState(() => obtenerCarrito());
  const [codigoCupon, setCodigoCupon] = useState('');
  const [porcentajeDescuento, setPorcentajeDescuento] = useState(0);

  // Persistencia en localStorage cada vez que cambia el carrito
  useEffect(() => {
    guardarCarrito(items);
  }, [items]);

  const subtotalGeneral = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const montoDescuento = Math.round(subtotalGeneral * porcentajeDescuento);
  const totalPagar = subtotalGeneral - montoDescuento;

  const cambiarCantidad = (indice, valor) => {
    let cantidad = parseInt(valor);
    if (isNaN(cantidad) || cantidad < 1) cantidad = 1;
    setItems(items.map((item, i) => (i === indice ? { ...item, cantidad } : item)));
  };

  const eliminarItem = indice => {
    setItems(items.filter((_, i) => i !== indice));
  };

  const aplicarCupon = () => {
    const codigo = codigoCupon.trim().toUpperCase();

    if (Object.prototype.hasOwnProperty.call(cuponesValidos, codigo)) {
      const descuento = cuponesValidos[codigo];
      setPorcentajeDescuento(descuento);
      alert(`¡Cupón "${codigo}" aplicado con éxito! (${descuento * 100}% de descuento)`);
    } else if (codigo === '') {
      alert('Por favor, ingresa un código de descuento.');
    } else {
      setPorcentajeDescuento(0);
      alert('El código promocional ingresado no es válido.');
    }
  };

  const reiniciarCarrito = () => {
    setItems([]);
    setPorcentajeDescuento(0);
    setCodigoCupon('');
  };

  const vaciarCarrito = () => {
    if (items.length === 0) {
      alert('El carrito ya está vacío.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas vaciar tu carrito?')) {
      reiniciarCarrito();
    }
  };

  const confirmarPedido = () => {
    if (items.length === 0) {
      alert('No tienes productos en tu carrito para realizar el pedido.');
      return;
    }

    alert(
      `¡Gracias por tu compra en Pastelería Mil Sabores!\nTu pedido por ${formatearCLP(totalPagar)} ha sido registrado exitosamente.`
    );
    reiniciarCarrito();
  };

  return (
    <>
      <style>{estiloInicio + '\n' + estiloCarrito}</style>

      <Header />

      <main>
        <section className="contenedor-principal">
          <h2 className="portada-titulo">Tu Carrito de Compras</h2>
          <p className="portada-baja">
            Revisa tus productos seleccionados, ingresa tu cupón y confirma la compra.
          </p>

          {/* Layout en 2 columnas */}
          <div className="carrito-grid">
            {/* Columna Izquierda: Tabla de productos */}
            <div className="card-carrito">
              <div className="contenedor-tabla">
                <table className="tabla-carrito">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Mensaje</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody id="itemsCarrito">
                    {items.length === 0 ? (
                      <tr>
                        <td
                          colSpan="6"
                          className="carrito-vacio"
                          style={{ textAlign: 'center', padding: '25px', color: '#777' }}
                        >
                          Tu carrito está vacío
                        </td>
                      </tr>
                    ) : (
                      items.map((item, i) => (
                        <tr key={`${item.codigo}|${item.mensaje}`}>
                          <td className="prod-nombre">{item.nombre}</td>
                          <td className="prod-mensaje">{item.mensaje ? `"${item.mensaje}"` : '-'}</td>
                          <td className="prod-precio">{formatearCLP(item.precio)}</td>
                          <td>
                            <input
                              type="number"
                              value={item.cantidad}
                              min="1"
                              className="campo-cantidad"
                              onChange={e => cambiarCantidad(i, e.target.value)}
                            />
                          </td>
                          <td className="prod-subtotal">{formatearCLP(item.precio * item.cantidad)}</td>
                          <td>
                            <button type="button" className="btn-eliminar" onClick={() => eliminarItem(i)}>
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Columna Derecha: Cupón + Resumen */}
            <div className="card-resumen">
              <div className="bloque-cupon">
                <h3 className="resumen-titulo">Código de Descuento</h3>
                <p className="texto-cupon">Ingresa tu código promocional:</p>
                <div className="cupon-box">
                  <input
                    type="text"
                    id="codigoCupon"
                    placeholder="Ej: FELICES50"
                    value={codigoCupon}
                    onChange={e => setCodigoCupon(e.target.value)}
                  />
                  <button type="button" id="btnAplicarCupon" onClick={aplicarCupon}>
                    Aplicar
                  </button>
                </div>
              </div>

              <hr className="separador" />

              <div className="resumen-pedido">
                <h3 className="resumen-titulo">Resumen del Pedido</h3>

                <div className="fila-resumen">
                  <span>Subtotal:</span>
                  <span id="subtotal">
                    <strong>{formatearCLP(subtotalGeneral)}</strong>
                  </span>
                </div>

                <div className="fila-resumen">
                  <span>Descuento:</span>
                  <span id="descuento">
                    <strong>{formatearCLP(montoDescuento)}</strong>
                  </span>
                </div>

                <div className="fila-resumen fila-total">
                  <span>Total a pagar:</span>
                  <strong id="total">{formatearCLP(totalPagar)}</strong>
                </div>

                <div className="acciones-carrito">
                  <button type="button" className="btn-confirmar" onClick={confirmarPedido}>
                    Confirmar Pedido
                  </button>
                  <button type="button" className="btn-vaciar" onClick={vaciarCarrito}>
                    Vaciar Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
