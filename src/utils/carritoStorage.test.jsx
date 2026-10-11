import { describe, it, expect, beforeEach } from 'vitest';
import {
  CARRITO_KEY,
  obtenerCarrito,
  guardarCarrito,
  agregarAlCarrito,
} from './carritoStorage.js';


const torta = { codigo: 'T001', nombre: 'Torta Cuadrada de Chocolate', precio: 45000 };

describe('carritoStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Test 4 
  it('obtenerCarrito devuelve una lista vacía si no hay nada guardado', () => {
    expect(obtenerCarrito()).toEqual([]);
  });

  // Test 5 
  it('guardarCarrito y obtenerCarrito guardan y recuperan los datos', () => {
    const carrito = [{ codigo: 'T001', cantidad: 2 }];

    guardarCarrito(carrito);

    expect(obtenerCarrito()).toEqual(carrito);
    expect(localStorage.getItem(CARRITO_KEY)).toBe(JSON.stringify(carrito));
  });

  // Test 6 
  it('agregarAlCarrito agrega un producto nuevo con cantidad 1', () => {
    agregarAlCarrito(torta, 'Feliz cumpleaños');

    const carrito = obtenerCarrito();
    expect(carrito).toHaveLength(1);              
    expect(carrito[0].codigo).toBe('T001');
    expect(carrito[0].mensaje).toBe('Feliz cumpleaños');
    expect(carrito[0].cantidad).toBe(1);
  });

  // Test 7 
  it('agregar el mismo producto con el mismo mensaje suma la cantidad', () => {
    agregarAlCarrito(torta, 'Hola');
    agregarAlCarrito(torta, 'Hola');

    const carrito = obtenerCarrito();
    expect(carrito).toHaveLength(1);              
    expect(carrito[0].cantidad).toBe(2);          
  });

  // Test 8 
  it('el mismo producto con otro mensaje queda como una fila distinta', () => {
    agregarAlCarrito(torta, 'Hola');
    agregarAlCarrito(torta, 'Chao');

    expect(obtenerCarrito()).toHaveLength(2);     
  });
});
