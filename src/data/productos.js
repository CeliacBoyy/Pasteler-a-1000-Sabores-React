import { leerLista, guardarLista } from './almacen.js';

const CLAVE = 'ms_productos';

const productosIniciales = [
  { codigo: 'TC001', categoria: 'Cuadradas', nombre: 'Torta Cuadrada de Chocolate', descripcion: "Chocolate con ganache y avellanas tostadas. Bizcocho húmedo, nada seco. Es la que nunca falla cuando no sabís qué pedir.", precio: 45000, stock: 12, stockCritico: 5, oferta: false, precioOferta: null },
  { codigo: 'TC002', categoria: 'Cuadradas', nombre: 'Torta Cuadrada de Frutas', descripcion: "Vainilla, crema y fruta fresca de la feria. Simple pero rica, como las que hacen en las casas de verano.", precio: 50000, stock: 8, stockCritico: 5, oferta: true, precioOferta: 45000 },
  { codigo: 'TT001', categoria: 'Circulares', nombre: 'Torta Circular de Vainilla', descripcion: "La torta de cumpleaños de siempre. Bizcochuelo esponjoso con crema pastelera casera, sin vueltas raras.", precio: 40000, stock: 15, stockCritico: 5, oferta: false, precioOferta: null },
  { codigo: 'TT002', categoria: 'Circulares', nombre: 'Torta Circular de Manjar', descripcion: "Manjar hecho en paila, reducido de a poco, con nueces picadas. Un sabor que a mucha gente le recuerda al sur.", precio: 42000, stock: 10, stockCritico: 5, oferta: false, precioOferta: null },
  { codigo: 'P1001', categoria: 'Postres', nombre: 'Mousse de Chocolate', descripcion: "Chocolate amargo, textura liviana. Ideal para cerrar un almuerzo sin dejar a nadie muy empalagado.", precio: 5000, stock: 40, stockCritico: 5, oferta: false, precioOferta: null },
  { codigo: 'P1002', categoria: 'Postres', nombre: 'Tiramisú Clásico', descripcion: "Café cargado, mascarpone y cacao encima. El que uno pide para quedar bien en una cena.", precio: 5500, stock: 3, stockCritico: 5, oferta: true, precioOferta: 4500 },
  { codigo: 'PSA001', categoria: 'Sin Azúcar', nombre: 'Torta Sin Azúcar de Naranja', descripcion: "Jugo de naranja natural y bizcocho húmedo, endulzada sin azúcar. Buena opción para la once sin culpa.", precio: 48000, stock: 6, stockCritico: 5, oferta: false, precioOferta: null },
  { codigo: 'PSA002', categoria: 'Sin Azúcar', nombre: 'Cheesecake Sin Azúcar', descripcion: "Base cremosa al horno, con mermelada casera de frutos rojos y sin azúcar añadida. Rinde harto.", precio: 47000, stock: 9, stockCritico: 5, oferta: false, precioOferta: null },
  { codigo: 'PT001', categoria: 'Tradicional', nombre: 'Empanada de Manzana', descripcion: "Hojaldre hecho a mano, relleno de manzana y un toque de canela. Como las de las picadas del sur cuando llueve.", precio: 3000, stock: 50, stockCritico: 5, oferta: false, precioOferta: null },
  { codigo: 'PT002', categoria: 'Tradicional', nombre: 'Tarta de Santiago', descripcion: "Almendra molida, huevo y ralladura de limón. Sin harina, receta de siempre.", precio: 6000, stock: 4, stockCritico: 5, oferta: true, precioOferta: 5000 },
  { codigo: 'PG001', categoria: 'Sin Gluten', nombre: 'Brownie Sin Gluten', descripcion: "Denso y bien chocolatoso, hecho con frutos secos molidos en vez de harina. Nadie se da cuenta que es sin gluten.", precio: 4000, stock: 25, stockCritico: 5, oferta: false, precioOferta: null },
  { codigo: 'PG002', categoria: 'Sin Gluten', nombre: 'Pan Sin Gluten', descripcion: "Horneado día por medio, con almidones naturales y semillas. Rico tostado con mantequilla.", precio: 3500, stock: 18, stockCritico: 5, oferta: false, precioOferta: null },
  { codigo: 'PV001', categoria: 'Vegana', nombre: 'Torta Vegana de Chocolate', descripcion: "Con leche vegetal y aceite de coco, pero igual de húmeda que la original. Para compartir sin restarle a nadie.", precio: 50000, stock: 7, stockCritico: 5, oferta: false, precioOferta: null },
  { codigo: 'PV002', categoria: 'Vegana', nombre: 'Galletas Veganas de Avena', descripcion: "Avena entera, jarabe vegetal y vainilla. Las de siempre para el bolso, camino a la u o al trabajo.", precio: 4500, stock: 30, stockCritico: 5, oferta: true, precioOferta: 3800 },
  { codigo: 'TE001', categoria: 'Especiales', nombre: 'Torta Especial de Cumpleaños', descripcion: "Decorada a mano con merengue, una por una. Pensada para el momento de apagar las velas.", precio: 55000, stock: 5, stockCritico: 5, oferta: false, precioOferta: null },
  { codigo: 'TE002', categoria: 'Especiales', nombre: 'Torta Especial de Boda', descripcion: "En pisos, bizcocho fino y rellenos a elección. La que se lleva las miradas en la fiesta.", precio: 60000, stock: 2, stockCritico: 5, oferta: false, precioOferta: null }
];

export function obtenerProductos() {
  return leerLista(CLAVE, productosIniciales);
}

export function obtenerProductoPorCodigo(codigo) {
  return obtenerProductos().find(p => p.codigo === codigo) || null;
}

export function obtenerProductosPorCategoria(categoria) {
  return obtenerProductos().filter(p => p.categoria === categoria);
}

// READ: productos en oferta
export function obtenerProductosEnOferta() {
  return obtenerProductos().filter(p => p.oferta === true);
}

export function obtenerProductosCriticos() {
  return obtenerProductos().filter(p => p.stock <= p.stockCritico);
}

// CREATE: agrega un producto
export function crearProducto(producto) {
  const lista = obtenerProductos();
  if (lista.some(p => p.codigo === producto.codigo)) return null;

  const nuevo = { stock: 0, stockCritico: 5, oferta: false, precioOferta: null, ...producto };
  lista.push(nuevo);
  guardarLista(CLAVE, lista);
  return nuevo;
}

// UPDATE: cambia los campos indicados 
export function actualizarProducto(codigo, datos) {
  const lista = obtenerProductos();
  const posicion = lista.findIndex(p => p.codigo === codigo);
  if (posicion === -1) return null;

  lista[posicion] = { ...lista[posicion], ...datos, codigo };
  guardarLista(CLAVE, lista);
  return lista[posicion];
}

// DELETE: elimina el producto.
export function eliminarProducto(codigo) {
  const lista = obtenerProductos();
  const restantes = lista.filter(p => p.codigo !== codigo);
  if (restantes.length === lista.length) return false;

  guardarLista(CLAVE, restantes);
  return true;
}