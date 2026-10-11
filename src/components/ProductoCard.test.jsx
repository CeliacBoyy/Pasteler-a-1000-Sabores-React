import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductoCard from './ProductoCard.jsx';
import { obtenerCarrito } from '../utils/carritoStorage.js';

const producto = {
  codigo: 'T001',
  categoria: 'Cuadradas',
  nombre: 'Torta Cuadrada de Chocolate',
  descripcion: 'Chocolate con ganache.',
  precio: 45000,
};

describe('ProductoCard', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Test 9 
  it('muestra el nombre, la categoría y el precio del producto', () => {
    render(<ProductoCard producto={producto} />);
    expect(screen.getByText('Torta Cuadrada de Chocolate')).toBeInTheDocument();
    expect(screen.getByText('Cuadradas')).toBeInTheDocument();
    expect(screen.getByText(/45[.,]000 CLP/)).toBeInTheDocument();
  });

  // Test 10 
  it('al escribir un mensaje y presionar "Añadir al Carrito" guarda el producto', () => {
    render(<ProductoCard producto={producto} />);

    const input = screen.getByLabelText('Mensaje personalizado:');
    fireEvent.change(input, { target: { value: 'Feliz cumpleaños' } });
    expect(input.value).toBe('Feliz cumpleaños');

    const boton = screen.getByRole('button', { name: 'Añadir al Carrito' });
    fireEvent.click(boton);

    const botonAnadido = screen.getByRole('button', { name: /añadido/i });
    expect(botonAnadido).toBeDisabled();

    const carrito = obtenerCarrito();
    expect(carrito).toHaveLength(1);
    expect(carrito[0].codigo).toBe('T001');
    expect(carrito[0].mensaje).toBe('Feliz cumpleaños');
  });
});
