import { Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio.jsx';
import Catalogo from './pages/Catalogo.jsx';
import Carrito from './pages/Carrito.jsx';
import InicioSesion from './pages/InicioSesion.jsx';
import Registro from './pages/Registro.jsx';
import Contactanos from './pages/Contactanos.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/usuario/inicio-sesion" element={<InicioSesion />} />
      <Route path="/usuario/registro" element={<Registro />} />
      <Route path="/contactanos" element={<Contactanos />} />
    </Routes>
  );
  <div className="d-flex flex-column min-vh-100">
  {/* Header, contenido y Footer */}
</div>
}
