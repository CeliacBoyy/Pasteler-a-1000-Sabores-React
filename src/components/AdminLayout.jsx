import { NavLink, useNavigate } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { obtenerSesion, cerrarSesion } from '../utils/sesion.js';

const enlaces = [
  { texto: 'Dashboard', ruta: '/admin' },
  { texto: 'Productos', ruta: '/admin/productos' },
  { texto: 'Categorías', ruta: '/admin/categorias' },
  { texto: 'Usuarios', ruta: '/admin/usuarios' },
  { texto: 'Órdenes', ruta: '/admin/ordenes' }
];

export default function AdminLayout({ titulo, children }) {
  const navigate = useNavigate();
  const sesion = obtenerSesion();

  const handleCerrarSesion = () => {
    cerrarSesion();
    navigate('/usuario/inicio-sesion');
  };

  return (
    <>
      <Header />

      <main className="flex-grow-1 py-4" style={{ backgroundColor: '#d8c2ad' }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h2 className="mb-0">{titulo}</h2>
              <p className="mb-0">Bienvenido, {sesion ? sesion.nombre : ''}</p>
            </div>
            <button type="button" className="btn btn-outline-dark" onClick={handleCerrarSesion}>
              Cerrar sesión
            </button>
          </div>

          <ul className="nav nav-pills mb-4">
            {enlaces.map(e => (
              <li className="nav-item" key={e.ruta}>
                <NavLink
                  end
                  to={e.ruta}
                  className={({ isActive }) => 'nav-link text-dark' + (isActive ? ' active bg-white' : '')}
                >
                  {e.texto}
                </NavLink>
              </li>
            ))}
          </ul>

          {children}
        </div>
      </main>

      <Footer />
    </>
  );
}
