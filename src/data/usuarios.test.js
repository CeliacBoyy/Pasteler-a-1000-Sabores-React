import { describe, it, expect, beforeEach } from 'vitest';
import {
  obtenerUsuarios,
  obtenerUsuarioPorCorreo,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from './usuarios.js';

const usuarioNuevo = {
  rut: '12345678-5',
  nombre: 'Ana',
  apellido: 'Pérez',
  correo: 'ana@correo.cl',
  contrasena: 'clave123',
};

describe('CRUD de usuarios', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Test 22
  it('al partir existe solo el administrador de ejemplo', () => {
    const usuarios = obtenerUsuarios();

    expect(usuarios).toHaveLength(1);
    expect(usuarios[0].correo).toBe('admin@milsabores.cl');
    expect(usuarios[0].rol).toBe('admin');
  });

  // Test 23
  it('crearUsuario asigna el id siguiente y el rol cliente por defecto', () => {
    const creado = crearUsuario(usuarioNuevo);

    expect(creado.id).toBe(2);
    expect(creado.rol).toBe('cliente');
    expect(obtenerUsuarios()).toHaveLength(2);
  });

  // Test 24
  it('crearUsuario rechaza un correo o un rut que ya existen', () => {
    crearUsuario(usuarioNuevo);

    // Mismo correo, aunque cambien las mayúsculas
    expect(crearUsuario({ ...usuarioNuevo, rut: '11111111-1', correo: 'ANA@correo.cl' })).toBeNull();
    // Mismo rut con otro correo
    expect(crearUsuario({ ...usuarioNuevo, correo: 'otra@correo.cl' })).toBeNull();
    expect(obtenerUsuarios()).toHaveLength(2);
  });

  // Test 25
  it('obtenerUsuarioPorCorreo no distingue mayúsculas y devuelve null si no existe', () => {
    expect(obtenerUsuarioPorCorreo('ADMIN@MILSABORES.CL').rol).toBe('admin');
    expect(obtenerUsuarioPorCorreo('nadie@correo.cl')).toBeNull();
  });

  // Test 26
  it('actualizarUsuario y eliminarUsuario modifican la lista guardada', () => {
    const creado = crearUsuario(usuarioNuevo);

    expect(actualizarUsuario(creado.id, { comuna: 'La Florida' }).comuna).toBe('La Florida');
    expect(eliminarUsuario(creado.id)).toBe(true);
    expect(obtenerUsuarios()).toHaveLength(1);
    expect(eliminarUsuario(creado.id)).toBe(false);
  });
});
