import { describe, it, expect, beforeEach } from 'vitest';
import {
  obtenerProductos,
  obtenerProductoPorCodigo,
  obtenerProductosEnOferta,
  obtenerProductosCriticos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from './productos.js';

describe('CRUD de productos', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Test 16
  it('obtenerProductos devuelve los 16 productos y obtenerProductoPorCodigo encuentra uno', () => {
    expect(obtenerProductos()).toHaveLength(16);
    expect(obtenerProductoPorCodigo('TC001').nombre).toBe('Torta Cuadrada de Chocolate');
    expect(obtenerProductoPorCodigo('NO-EXISTE')).toBeNull();
  });

  // Test 17
  it('obtenerProductosCriticos devuelve solo los que tienen stock menor o igual al crítico', () => {
    const codigos = obtenerProductosCriticos().map(p => p.codigo).sort();

    expect(codigos).toEqual(['P1002', 'PT002', 'TE001', 'TE002']);
  });

  // Test 18
  it('obtenerProductosEnOferta devuelve solo los productos con oferta', () => {
    const enOferta = obtenerProductosEnOferta();

    expect(enOferta).toHaveLength(4);
    expect(enOferta.every(p => p.oferta === true)).toBe(true);
  });

  // Test 19
  it('crearProducto agrega un producto y rechaza un código repetido', () => {
    const nuevo = crearProducto({ codigo: 'N001', nombre: 'Flan', categoria: 'Postres', precio: 2500 });

    // Los campos que no se entregan toman un valor por defecto
    expect(nuevo.stock).toBe(0);
    expect(obtenerProductos()).toHaveLength(17);

    // Con el mismo código devuelve null
    expect(crearProducto({ codigo: 'N001', nombre: 'Otro' })).toBeNull();
    expect(obtenerProductos()).toHaveLength(17);
  });

  // Test 20
  it('actualizarProducto cambia los datos pero nunca el código', () => {
    const actualizado = actualizarProducto('TC001', { precio: 47000, codigo: 'OTRO' });

    expect(actualizado.precio).toBe(47000);
    expect(actualizado.codigo).toBe('TC001');
    expect(actualizarProducto('NO-EXISTE', { precio: 1 })).toBeNull();
  });

  // Test 21
  it('eliminarProducto elimina el producto y devuelve false si no existe', () => {
    expect(eliminarProducto('TC001')).toBe(true);
    expect(obtenerProductos()).toHaveLength(15);
    expect(obtenerProductoPorCodigo('TC001')).toBeNull();
    expect(eliminarProducto('TC001')).toBe(false);
  });
});
