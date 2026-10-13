import AdminLayout from '../../components/AdminLayout.jsx';
import useTitulo from '../../utils/useTitulo.js';
import { obtenerProductos, obtenerProductosCriticos } from '../../data/productos.js';
import { obtenerCategorias } from '../../data/categorias.js';
import { obtenerUsuarios } from '../../data/usuarios.js';
import { obtenerOrdenes } from '../../data/ordenes.js';

export default function Dashboard() {
  useTitulo('Panel de administrador - Pasteleria mil sabores');

  const tarjetas = [
    { titulo: 'Productos', valor: obtenerProductos().length },
    { titulo: 'Productos críticos', valor: obtenerProductosCriticos().length },
    { titulo: 'Categorías', valor: obtenerCategorias().length },
    { titulo: 'Usuarios', valor: obtenerUsuarios().length },
    { titulo: 'Órdenes', valor: obtenerOrdenes().length }
  ];

  return (
    <AdminLayout titulo="Panel de administrador">
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
    </AdminLayout>
  );
}
