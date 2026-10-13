import { Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio.jsx';
import Catalogo from './pages/Catalogo.jsx';
import Carrito from './pages/Carrito.jsx';
import InicioSesion from './pages/InicioSesion.jsx';
import Registro from './pages/Registro.jsx';
import Contactanos from './pages/Contactanos.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import RutaAdmin from './components/RutaAdmin.jsx';
import ProductosAdmin from './pages/admin/ProductosAdmin.jsx';
import CategoriasAdmin from './pages/admin/CategoriasAdmin.jsx';
import UsuariosAdmin from './pages/admin/UsuariosAdmin.jsx';
import OrdenesAdmin from './pages/admin/OrdenesAdmin.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/usuario/inicio-sesion" element={<InicioSesion />} />
      <Route path="/usuario/registro" element={<Registro />} />
      <Route path="/contactanos" element={<Contactanos />} />
      <Route path="/admin" element={<RutaAdmin><Dashboard /></RutaAdmin>} />
      <Route path="/admin/productos" element={<RutaAdmin><ProductosAdmin /></RutaAdmin>} />
      <Route path="/admin/categorias" element={<RutaAdmin><CategoriasAdmin /></RutaAdmin>} />
      <Route path="/admin/usuarios" element={<RutaAdmin><UsuariosAdmin /></RutaAdmin>} />
      <Route path="/admin/ordenes" element={<RutaAdmin><OrdenesAdmin /></RutaAdmin>} />
    </Routes>
  );
  <div className="d-flex flex-column min-vh-100">
  {/* Header, contenido y Footer */}
</div>
}
