import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 1. Importas todas tus páginas de la carpeta /pages
import Inicio from './pages/Inicio.jsx';
import Catalogo from './pages/Catalogo.jsx';
import Carrito from './pages/Carrito.jsx';
import Contacto from './pages/Contacto.jsx';
import InicioSesion from './pages/InicioSesion.jsx';
import Registro from './pages/Registro.jsx';

// Tus 4 nuevas vistas
import Ofertas from './pages/Ofertas.jsx';
import Checkout from './pages/Checkout.jsx';
import PagoExitoso from './pages/PagoExitoso.jsx';
import PagoError from './pages/PagoError.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas ya existentes */}
        <Route path="/" element={<Inicio />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/usuario/login" element={<InicioSesion />} />
        <Route path="/usuario/registro" element={<Registro />} />

        {/* Tus nuevas rutas asignadas */}
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pago-exitoso" element={<PagoExitoso />} />
        <Route path="/pago-error" element={<PagoError />} />
      </Routes>
    </BrowserRouter>
  );
}