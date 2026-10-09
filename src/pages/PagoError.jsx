import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import useTitulo from '../utils/useTitulo.js';
import estilos from '../styles/checkout.css?inline';

export default function PagoError() {
  useTitulo('Error en el Pago - Pastelería 1000 Sabores');
  const navigate = useNavigate();
  const [orden, setOrden] = useState(null);

  useEffect(() => {
    const ordenGuardada = JSON.parse(localStorage.getItem('ultimaOrden'));
    if (ordenGuardada) setOrden(ordenGuardada);
  }, []);

  return (
    <>
      <style>{estilos}</style>
      <Header />

      <main className="contenedor-checkout">
        <div className="card-checkout text-center">
          <div className="alerta-error">
            ✖ No se pudo realizar el pago. {orden ? `nro ${orden.nroOrden}` : ''}
          </div>

          <p className="descripcion">Hubo un problema al procesar tu tarjeta o método de pago. Por favor, reintenta la transacción.</p>

          <button onClick={() => navigate('/checkout')} className="btn-error-reintentar">
            VOLVER A REALIZAR EL PAGO
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}