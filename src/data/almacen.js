export function leerLista(clave, iniciales) {
  try {
    const texto = localStorage.getItem(clave);
    if (texto !== null) {
      const lista = JSON.parse(texto);
      if (Array.isArray(lista)) return lista;
    }
  } catch (e) {
  }
  guardarLista(clave, iniciales);
  return iniciales;
}

export function guardarLista(clave, lista) {
  localStorage.setItem(clave, JSON.stringify(lista));
}

export function siguienteId(lista) {
  return lista.reduce((mayor, item) => Math.max(mayor, item.id), 0) + 1;
}