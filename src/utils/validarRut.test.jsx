import { describe, it, expect } from 'vitest';
import { validarRut } from './validarRut.js';


describe('validarRut', () => {
 

  // Test 1 
  it('acepta un RUT válido con puntos y guion', () => {
    expect(validarRut('12.345.678-5')).toBe(true);
  });

  // Test 2 
  it('rechaza un RUT con dígito verificador incorrecto', () => {
    expect(validarRut('12.345.678-9')).toBe(false);
  });

  // Test 3 
  it('acepta un RUT cuyo dígito verificador es K', () => {
    expect(validarRut('10.000.013-K')).toBe(true);
  });
});
