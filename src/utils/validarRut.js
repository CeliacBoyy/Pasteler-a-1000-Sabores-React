export function validarRut(rut) {
  rut = rut.replace(/\./g, '').trim();

  let cuerpo = rut.slice(0, -1);
  let dv = rut.slice(-1).toUpperCase();

  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    if (cuerpo[i] == '-') {
      continue;
    }
    suma = suma + Number(cuerpo[i]) * multiplicador;
    multiplicador++;
    if (multiplicador > 7) {
      multiplicador = 2;
    }
  }

  let resto = suma % 11;
  let resultado = 11 - resto;
  let dvEsperado;

  if (resultado == 11) {
    dvEsperado = '0';
  } else if (resultado == 10) {
    dvEsperado = 'K';
  } else {
    dvEsperado = String(resultado);
  }
  return dv == dvEsperado;
}
