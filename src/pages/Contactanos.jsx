import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import useTitulo from '../utils/useTitulo.js';
import estilos from '../styles/contactanos.css?inline';

export default function Contactanos() {
  useTitulo('Pasteleria mil sabores');

  return (
    <>
      <style>{estilos}</style>

      <Header />

      <main>
        <section className="portada-contactanos container">
          <div className="row g-4">
            {/* Cuadro de la Imagen */}
            <div className="col-12 col-lg-6">
              <div className="card-contacto-img h-100">
                <img
                  className="ubicacion-img img-fluid"
                  src="/multimedia/imagen ubicacion.jpeg"
                  alt="Ubicación de la Pastelería 1000 Sabores"
                />
              </div>
            </div>

            {/* Cuadro de la Información de Contacto */}
            <div className="col-12 col-lg-6">
              <div className="card-contacto-info h-100">
                <h2 className="portada-titulo">Contáctanos</h2>

                <p className="texto-contactanos">📞 +56 32 1234567</p>
                <p className="texto-contactanos">📞 +56 9 12345678</p>
                <p className="texto-contactanos">📍 Dirección falsa 123, La Florida, Región Metropolitana</p>
                <p className="texto-contactanos">
                  🕓 Lunes a Sábado de 11:00 a 20:00 hrs. <br />
                  Domingo de 11:00 a 18:30 hrs.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}