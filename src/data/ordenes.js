import { leerLista, guardarLista, siguienteId } from './almacen.js';

const CLAVE = 'ms_ordenes';

const ordenesIniciales = [];

export function obtenerOrdenes() {
  return leerLista(CLAVE, ordenesIniciales);
}

export function obtenerOrdenPorId(id) {
  return obtenerOrdenes().find(o => o.id === id) || null;
}

export function obtenerOrdenesPorUsuario(correo) {
  return obtenerOrdenes().filter(
    o => o.cliente && o.cliente.correo.toLowerCase() === correo.toLowerCase()
  );
}

export function crearOrden(orden) {
  const lista = obtenerOrdenes();
  const id = siguienteId(lista);

  const nueva = {
    estado: 'pagada',
    descuento: 0,
    ...orden,
    id,
    codigo: 'ORDER' + String(id).padStart(5, '0'),
    fecha: new Date().toISOString()
  };
  lista.push(nueva);
  guardarLista(CLAVE, lista);
  return nueva;
}

export function actualizarEstadoOrden(id, estado) {
  const lista = obtenerOrdenes();
  const posicion = lista.findIndex(o => o.id === id);
  if (posicion === -1) return null;

  lista[posicion] = { ...lista[posicion], estado };
  guardarLista(CLAVE, lista);
  return lista[posicion];
}
