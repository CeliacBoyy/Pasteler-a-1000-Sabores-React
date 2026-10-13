import { describe, it, expect, beforeEach } from 'vitest';
import {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from './categorias.js';

describe('CRUD de categorías', () => {
  beforeEach(() => {
    // Antes de cada prueba se limpia el localStorage para partir con los datos iniciales
    localStorage.clear();
  });

  // Test 11
  it('obtenerCategorias devuelve las 8 categorías iniciales', () => {
    expect(obtenerCategorias()).toHaveLength(8);
    expect(obtenerCategoriaPorId(1).nombre).toBe('Cuadradas');
  });

  // Test 12
  it('crearCategoria agrega una categoría nueva con el siguiente id', () => {
    const nueva = crearCategoria({ nombre: 'Cupcakes', descripcion: 'Cupcakes artesanales' });

    // Había 8, así que la nueva debe tener el id 9
    expect(nueva.id).toBe(9);
    expect(obtenerCategorias()).toHaveLength(9);
  });

  // Test 13
  it('crearCategoria rechaza un nombre repetido sin importar mayúsculas', () => {
    const resultado = crearCategoria({ nombre: 'CUADRADAS' });

    // Si el nombre ya existe la función devuelve null y no agrega nada
    expect(resultado).toBeNull();
    expect(obtenerCategorias()).toHaveLength(8);
  });

  // Test 14
  it('actualizarCategoria cambia los datos pero nunca el id', () => {
    const actualizada = actualizarCategoria(1, { descripcion: 'Nueva descripción', id: 99 });

    expect(actualizada.descripcion).toBe('Nueva descripción');
    expect(actualizada.id).toBe(1);
    expect(actualizarCategoria(500, { nombre: 'No existe' })).toBeNull();
  });

  // Test 15
  it('eliminarCategoria elimina la categoría y devuelve false si ya no existe', () => {
    expect(eliminarCategoria(8)).toBe(true);
    expect(obtenerCategorias()).toHaveLength(7);

    // Al intentar eliminarla otra vez ya no existe
    expect(eliminarCategoria(8)).toBe(false);
  });
});
