import { useState, useRef, useEffect } from 'react';
import { agregarAlCarrito } from '../utils/carritoStorage.js';

export default function ProductoCard({ producto }) {
  const [mensaje, setMensaje] = useState('');
  const [anadido, setAnadido] = useState(false);
  const temporizador = useRef(null);

  useEffect(() => () => clearTimeout(temporizador.current), []);

  const handleAnadir = () => {
    agregarAlCarrito(producto, mensaje.trim());

    setAnadido(true);
    temporizador.current = setTimeout(() => setAnadido(false), 900);
  };

  return (
    <article className="tarjeta-producto" data-codigo={producto.codigo}>
      <span className="badge-categoria">{producto.categoria}</span>
      <h3 className="tarjeta-titulo">{producto.nombre}</h3>
      <p className="tarjeta-descripcion">{producto.descripcion}</p>
      <p className="tarjeta-precio">
        <strong>${producto.precio.toLocaleString('es-CL')} CLP</strong>
      </p>

      <div className="campo-personalizacion">
        <label htmlFor={`msj-${producto.codigo}`}>Mensaje personalizado:</label>
        <input
          type="text"
          id={`msj-${producto.codigo}`}
          placeholder="Ej: ¡Feliz Cumpleaños!"
          value={mensaje}
          onChange={e => setMensaje(e.target.value)}
        />
      </div>

      <button type="button" className="btn-anadir" onClick={handleAnadir} disabled={anadido}>
        {anadido ? '¡Añadido! ✓' : 'Añadir al Carrito'}
      </button>
    </article>
  );
}
