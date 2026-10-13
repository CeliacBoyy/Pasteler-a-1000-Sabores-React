import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header.jsx';
import Footer from '../../components/Footer.jsx';
import useTitulo from '../../utils/useTitulo.js';
import { obtenerSesion, cerrarSesion } from '../../utils/sesion.js';
import { obtenerProductos, obtenerProductosCriticos } from '../../data/productos.js';
import { obtenerCategorias } from '../../data/categorias.js';
import { obtenerUsuarios } from '../../data/usuarios.js';
import { obtenerOrdenes } from '../../data/ordenes.js';

export default function Dashboard() {
  useTitulo('Panel de administrador - Pasteleria mil sabores');

  const navigate = useNavigate();
  const sesion = obtenerSesion();

  const tarjetas = [
    { titulo: 'Productos', valor: obtenerProductos().length },
    { titulo: 'Productos críticos', valor: obtenerProductosCriticos().length },
    { titulo: 'Categorías', valor: obtenerCategorias().length },
    { titulo: 'Usuarios', valor: obtenerUsuarios().length },
    { titulo: 'Órdenes', valor: obtenerOrdenes().length }
  ];

  const handleCerrarSesion = () => {
    cerrarSesion();
    navigate('/usuario/inicio-sesion');
  };

  return (
    <>
      <Header />

      <main className="flex-grow-1 py-4" style={{ backgroundColor: '#d8c2ad' }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-0">Panel de administrador</h2>
              <p className="mb-0">Bienvenido, {sesion.nombre}</p>
            </div>
            <button type="button" className="btn btn-outline-dark" onClick={handleCerrarSesion}>
              Cerrar sesión
            </button>
          </div>

          <div className="row g-3">
            {tarjetas.map(t => (
              <div className="col-6 col-md-4 col-lg" key={t.titulo}>
                <div className="card text-center h-100">
                  <div className="card-body">
                    <h3 className="card-title h6">{t.titulo}</h3>
                    <p className="display-6 mb-0">{t.valor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
