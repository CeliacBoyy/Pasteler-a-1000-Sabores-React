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
    <article className="tarjeta-producto card h-100" data-codigo={producto.codigo}>
      <div className="card-body d-flex flex-column gap-2">
        <span className="badge-categoria badge align-self-start">{producto.categoria}</span>
        <h3 className="tarjeta-titulo card-title">{producto.nombre}</h3>
        <p className="tarjeta-descripcion card-text">{producto.descripcion}</p>
        <p className="tarjeta-precio">
          <strong>${producto.precio.toLocaleString('es-CL')} CLP</strong>
        </p>

        <div className="campo-personalizacion">
          <label htmlFor={`msj-${producto.codigo}`} className="form-label small">
            Mensaje personalizado:
          </label>
          <input
            type="text"
            id={`msj-${producto.codigo}`}
            className="form-control form-control-sm"
            placeholder="Ej: ¡Feliz Cumpleaños!"
            value={mensaje}
            onChange={e => setMensaje(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="btn-anadir btn w-100 mt-auto"
          onClick={handleAnadir}
          disabled={anadido}
        >
          {anadido ? '¡Añadido! ✓' : 'Añadir al Carrito'}
        </button>
      </div>
    </article>
  );
}