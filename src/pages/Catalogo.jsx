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
        <section className="contenedor-principal">
          <h2 className="portada-titulo">Nuestro Catálogo</h2>
          <p className="portada-baja">
            Explora nuestras variedades, personaliza tus productos y añádelos al carrito.
          </p>

          <div className="panel-busqueda">
            <input
              type="text"
              id="inputBuscar"
              className="campo-buscar"
              placeholder="Buscar por nombre o descripción..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />

            <div className="contenedor-filtros">
              {CATEGORIAS.map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`btn-filtro${categoriaActual === cat ? ' active' : ''}`}
                  onClick={() => setCategoriaActual(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid-productos" id="contenedorProductos">
            {filtrados.length === 0 ? (
              <p className="mensaje-vacio">
                No se encontraron productos que coincidan con tu búsqueda.
              </p>
            ) : (
              filtrados.map(p => <ProductoCard key={p.codigo} producto={p} />)
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
