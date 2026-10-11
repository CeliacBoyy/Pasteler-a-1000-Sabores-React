import { describe, it, expect } from 'vitest';
import { validarRut } from './validarRut.js';


describe('validarRut', () => {
 

  // Test 1 
  it('acepta un RUT válido con puntos y guion', () => {
    // expect(lo que obtuve).toBe(lo que esperaba)
    expect(validarRut('12.345.678-5')).toBe(true);
  });

  // Test 2 
  it('rechaza un RUT con dígito verificador incorrecto', () => {
    // Es el mismo número de arriba pero con el dígito final cambiado (5 -> 9)
    expect(validarRut('12.345.678-9')).toBe(false);
  });

  // Test 3 
  it('acepta un RUT cuyo dígito verificador es K', () => {
    // La K es un caso especial (cuando el cálculo da 10)
    expect(validarRut('10.000.013-K')).toBe(true);
  });
});
