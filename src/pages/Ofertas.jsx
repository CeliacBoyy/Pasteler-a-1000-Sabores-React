import { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import useTitulo from '../utils/useTitulo.js';
import { productos as listaProductos } from '../data/data.js'; // O la ruta a tu data.js
import estilos from '../styles/catalogo.css?inline';

export default function Ofertas() {
  useTitulo('Ofertas Especiales - Pastelería 1000 Sabores');

  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    // Filtrar productos con la propiedad oferta: true o precioOferta
    const productosEnOferta = listaProductos.filter(p => p.oferta === true);
    setOfertas(productosEnOferta.length > 0 ? productosEnOferta : listaProductos.slice(0, 4));
  }, []);

  const agregarAlCarrito = (producto, e) => {
    const inputMensaje = e.target.closest('.tarjeta-producto').querySelector('input');
    const mensaje = inputMensaje ? inputMensaje.value.trim() : '';

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const idUnico = `${producto.nombre}_${mensaje}`;
    const index = carrito.findIndex(item => item.id === idUnico);

    if (index !== -1) {
      carrito[index].cantidad += 1;
    } else {
      carrito.push({
        id: idUnico,
        nombre: producto.nombre,
        precio: `$${(producto.precioOferta || producto.precio).toLocaleString('es-CL')} CLP`,
        mensaje: mensaje ? `"${mensaje}"` : 'Sin mensaje',
        cantidad: 1
      });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    if (inputMensaje) inputMensaje.value = '';
    alert(`¡"${producto.nombre}" en oferta agregado al carrito!`);
    window.dispatchEvent(new Event('storage')); // Notificar cambio al Navbar
  };

  return (
    <>
      <style>{estilos}</style>
      <Header />

      <main>
        <section class="contenedor-principal">
          <h2 class="portada-titulo">Ofertas Destacadas 🏷️</h2>
          <p class="portada-baja">Aprovecha nuestros descuentos especiales por tiempo limitado.</p>

          <div class="grid-productos">
            {ofertas.map(p => (
              <article key={p.codigo} class="tarjeta-producto">
                <span class="badge-categoria">¡OFERTA!</span>
                <h3 class="tarjeta-titulo">{p.nombre}</h3>
                <p class="tarjeta-descripcion">{p.descripcion}</p>
                <p class="tarjeta-precio">
                  <span style={{ textDecoration: 'line-through', color: '#888', marginRight: '8px', fontSize: '14px' }}>
                    ${p.precio.toLocaleString('es-CL')}
                  </span>
                  <strong>${(p.precioOferta || Math.round(p.precio * 0.8)).toLocaleString('es-CL')} CLP</strong>
                </p>

                <div class="campo-personalizacion">
                  <label htmlFor={`msj-${p.codigo}`}>Mensaje personalizado:</label>
                  <input type="text" id={`msj-${p.codigo}`} placeholder="Ej: ¡Felicidades!" />
                </div>

                <button type="button" class="btn-anadir" onClick={(e) => agregarAlCarrito(p, e)}>
                  Añadir al Carrito
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}