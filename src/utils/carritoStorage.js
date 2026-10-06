export const CARRITO_KEY = 'carritoMilSabores';

export function obtenerCarrito() {
  try {
    return JSON.parse(localStorage.getItem(CARRITO_KEY)) || [];
  } catch (e) {
    return [];
  }
}

export function guardarCarrito(carrito) {
  localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
}

export function agregarAlCarrito(producto, mensaje) {
  const carrito = obtenerCarrito();
  const existente = carrito.find(item => item.codigo === producto.codigo && item.mensaje === mensaje);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({
      codigo: producto.codigo,
      nombre: producto.nombre,
      precio: producto.precio,
      mensaje: mensaje || '',
      cantidad: 1
    });
  }

  guardarCarrito(carrito);
}
