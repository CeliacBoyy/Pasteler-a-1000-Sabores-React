import { leerLista, guardarLista, siguienteId } from './almacen.js';

const CLAVE = 'ms_categorias';

const categoriasIniciales = [
  { id: 1, nombre: 'Cuadradas', descripcion: 'Tortas cuadradas para compartir' },
  { id: 2, nombre: 'Circulares', descripcion: 'Tortas circulares clásicas' },
  { id: 3, nombre: 'Postres', descripcion: 'Postres individuales' },
  { id: 4, nombre: 'Sin Azúcar', descripcion: 'Productos endulzados sin azúcar' },
  { id: 5, nombre: 'Tradicional', descripcion: 'Pastelería tradicional chilena' },
  { id: 6, nombre: 'Sin Gluten', descripcion: 'Productos aptos para celíacos' },
  { id: 7, nombre: 'Vegana', descripcion: 'Productos sin ingredientes de origen animal' },
  { id: 8, nombre: 'Especiales', descripcion: 'Tortas para ocasiones especiales' }
];

export function obtenerCategorias() {
  return leerLista(CLAVE, categoriasIniciales);
}

export function obtenerCategoriaPorId(id) {
  return obtenerCategorias().find(c => c.id === id) || null;
}

export function crearCategoria(categoria) {
  const lista = obtenerCategorias();
  const repetida = lista.some(c => c.nombre.toLowerCase() === categoria.nombre.toLowerCase());
  if (repetida) return null;

  const nueva = { descripcion: '', ...categoria, id: siguienteId(lista) };
  lista.push(nueva);
  guardarLista(CLAVE, lista);
  return nueva;
}

export function actualizarCategoria(id, datos) {
  const lista = obtenerCategorias();
  const posicion = lista.findIndex(c => c.id === id);
  if (posicion === -1) return null;

  lista[posicion] = { ...lista[posicion], ...datos, id };
  guardarLista(CLAVE, lista);
  return lista[posicion];
}

export function eliminarCategoria(id) {
  const lista = obtenerCategorias();
  const restantes = lista.filter(c => c.id !== id);
  if (restantes.length === lista.length) return false;

  guardarLista(CLAVE, restantes);
  return true;
}
