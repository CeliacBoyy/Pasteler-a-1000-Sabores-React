import { describe, it, expect, beforeEach } from 'vitest';
import {
  obtenerOrdenes,
  obtenerOrdenPorId,
  obtenerOrdenesPorUsuario,
  crearOrden,
  actualizarEstadoOrden,
} from './ordenes.js';

const ordenBase = {
  cliente: { nombre: 'Ana', apellido: 'Pérez', correo: 'ana@correo.cl' },
  direccion: { calle: 'Calle 1', region: 'Metropolitana', comuna: 'La Florida' },
  items: [{ codigo: 'TC001', nombre: 'Torta Cuadrada de Chocolate', precio: 45000, cantidad: 1, mensaje: '' }],
  total: 45000,
};

describe('CRUD de órdenes', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Test 27
  it('crearOrden genera el id, el código, la fecha y el estado pagada', () => {
    expect(obtenerOrdenes()).toHaveLength(0);

    const orden = crearOrden(ordenBase);

    expect(orden.id).toBe(1);
    expect(orden.codigo).toBe('ORDER00001');
    expect(orden.estado).toBe('pagada');
    expect(orden.fecha).toBeDefined();
    expect(obtenerOrdenPorId(1).total).toBe(45000);
  });

  // Test 28
  it('actualizarEstadoOrden cambia solo el estado y devuelve null si no existe', () => {
    crearOrden(ordenBase);

    expect(actualizarEstadoOrden(1, 'error').estado).toBe('error');
    expect(obtenerOrdenPorId(1).total).toBe(45000);
    expect(actualizarEstadoOrden(99, 'error')).toBeNull();
  });

  // Test 29
  it('obtenerOrdenesPorUsuario devuelve solo las compras de ese correo', () => {
    crearOrden(ordenBase);
    crearOrden({ ...ordenBase, cliente: { nombre: 'Luis', apellido: 'Rojas', correo: 'luis@correo.cl' } });

    expect(obtenerOrdenesPorUsuario('ANA@correo.cl')).toHaveLength(1);
    expect(obtenerOrdenesPorUsuario('nadie@correo.cl')).toHaveLength(0);
  });
});
