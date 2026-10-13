const SESION_KEY = 'ms_sesion';

export function iniciarSesion(usuario) {
  localStorage.setItem(SESION_KEY, JSON.stringify(usuario));
}

export function obtenerSesion() {
  try {
    return JSON.parse(localStorage.getItem(SESION_KEY)) || null;
  } catch (e) {
    return null;
  }
}

export function cerrarSesion() {
  localStorage.removeItem(SESION_KEY);
}

export function esAdmin() {
  const sesion = obtenerSesion();
  return sesion !== null && sesion.rol === 'admin';
}
