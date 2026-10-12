import { leerLista, guardarLista, siguienteId } from './almacen.js';

const CLAVE = 'ms_usuarios';

const usuariosIniciales = [
  {
    id: 1,
    rut: '11111111-1',
    nombre: 'Admin',
    apellido: 'Mil Sabores',
    correo: 'admin@milsabores.cl',
    contrasena: 'admin123',
    rol: 'admin',
    calle: '',
    departamento: '',
    region: '',
    comuna: ''
  }
];

export function obtenerUsuarios() {
  return leerLista(CLAVE, usuariosIniciales);
}

export function obtenerUsuarioPorId(id) {
  return obtenerUsuarios().find(u => u.id === id) || null;
}

export function obtenerUsuarioPorCorreo(correo) {
  return obtenerUsuarios().find(u => u.correo.toLowerCase() === correo.toLowerCase()) || null;
}

// CREATE: agrega un usuario con id automático y rol 'cliente' por defecto.
export function crearUsuario(usuario) {
  const lista = obtenerUsuarios();
  const correoRepetido = lista.some(u => u.correo.toLowerCase() === usuario.correo.toLowerCase());
  const rutRepetido = lista.some(u => u.rut === usuario.rut);
  if (correoRepetido || rutRepetido) return null;

  const nuevo = {
    rol: 'cliente',
    calle: '',
    departamento: '',
    region: '',
    comuna: '',
    ...usuario,
    id: siguienteId(lista)
  };
  lista.push(nuevo);
  guardarLista(CLAVE, lista);
  return nuevo;
}

// UPDATE: cambia los campos indicados.
// Devuelve el usuario actualizado, o null si no existe.
export function actualizarUsuario(id, datos) {
  const lista = obtenerUsuarios();
  const posicion = lista.findIndex(u => u.id === id);
  if (posicion === -1) return null;

  lista[posicion] = { ...lista[posicion], ...datos, id };
  guardarLista(CLAVE, lista);
  return lista[posicion];
}

// DELETE: elimina el usuario.
export function eliminarUsuario(id) {
  const lista = obtenerUsuarios();
  const restantes = lista.filter(u => u.id !== id);
  if (restantes.length === lista.length) return false;

  guardarLista(CLAVE, restantes);
  return true;
}