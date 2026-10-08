import { useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import ProductoCard from '../components/ProductoCard.jsx';
import useTitulo from '../utils/useTitulo.js';
import { productos } from '../data/productos.js';
import estilos from '../styles/catalogo.css?inline';

const CATEGORIAS = [
  'Todas',
  'Cuadradas',
  'Circulares',
  'Postres',
  'Sin Azúcar',
  'Tradicional',
  'Sin Gluten',
  'Vegana',
  'Especiales'
];

export default function Catalogo() {
  useTitulo('Catálogo - Pasteleria mil sabores');

  const [categoriaActual, setCategoriaActual] = useState('Todas');
  const [busqueda, setBusqueda] = useState('');

  const texto = busqueda.toLowerCase();
  const filtrados = productos.filter(p => {
    const matchesCat = categoriaActual === 'Todas' || p.categoria === categoriaActual;
    const matchesText =
      p.nombre.toLowerCase().includes(texto) || p.descripcion.toLowerCase().includes(texto);
    return matchesCat && matchesText;
  });

  return (
    <>
      <style>{estilos}</style>

      <Header />

      <main>
        <section className="contenedor-principal container py-4">
          <h2 className="portada-titulo">Nuestro Catálogo</h2>
          <p className="portada-baja">
            Explora nuestras variedades, personaliza tus productos y añádelos al carrito.
          </p>

          <div className="panel-busqueda d-flex flex-column gap-3 p-3 mb-4">
            <input
              type="text"
              id="inputBuscar"
              className="campo-buscar form-control"
              placeholder="Buscar por nombre o descripción..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />

            <div className="contenedor-filtros d-flex flex-wrap gap-2">
              {CATEGORIAS.map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`btn btn-sm rounded-pill btn-filtro${categoriaActual === cat ? ' active' : ''}`}
                  onClick={() => setCategoriaActual(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div
            className="grid-productos row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
            id="contenedorProductos"
          >
            {filtrados.length === 0 ? (
              <div className="col-12">
                <p className="mensaje-vacio">
                  No se encontraron productos que coincidan con tu búsqueda.
                </p>
              </div>
            ) : (
              filtrados.map(p => (
                <div className="col" key={p.codigo}>
                  <ProductoCard producto={p} />
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}