import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import useTitulo from '../utils/useTitulo.js';
import estilos from '../styles/inicio.css?inline';

export default function Inicio() {
  useTitulo('Pasteleria mil sabores');

  return (
    <>
      <style>{estilos}</style>

      <Header mostrarInicio={false} />

      <main>
        <section className="portada-index">
          <div className="portada-contenido">
            <div className="card-index-texto">
              <h2 className="portada-titulo">¿Quiénes somos?</h2>
              <p className="portada-baja">
                Pastelería 1000 Sabores es una pastelería chilena con una historia de 50 años,
                dedicada a crear productos de repostería de alta calidad para acompañar los momentos más
                especiales de nuestros clientes.
              </p>

              <p className="portada-baja">
                A lo largo de nuestra trayectoria, nos hemos convertido en un referente de la
                repostería chilena. Uno de nuestros grandes hitos ocurrió en 1995, cuando participamos en la creación de la
                torta más grande del mundo, formando parte de un récord Guinness que quedó marcado en nuestra historia.
              </p>

              <p className="portada-baja">
                Hoy, seguimos celebrando nuestras raíces, pero mirando hacia el futuro. Por eso,
                buscamos entregar una experiencia de compra moderna, accesible y sencilla, acercando
                nuestros productos a más personas a través de nuestra tienda online.
              </p>

              <h2 className="portada-titulo">Nuestra misión</h2>
              <p className="portada-baja">
                Ofrecer una experiencia dulce y memorable, entregando
                tortas y productos de repostería de alta calidad para todas las ocasiones, mientras mantenemos
                vivas nuestras raíces históricas y fomentamos la creatividad en el mundo de la repostería.
              </p>

              <h2 className="portada-titulo">Nuestra visión</h2>
              <p className="portada-baja">
                Convertirnos en la tienda online líder de productos de
                repostería en Chile, destacándonos por nuestra innovación, calidad y por generar un
                impacto positivo en la comunidad.
              </p>

              <h2 className="portada-titulo">50 años creando momentos dulces</h2>
              <p className="portada-baja">
                Nuestra historia nos inspira, nuestra calidad nos representa
                y la innovación nos impulsa a seguir creciendo.
              </p>
            </div>

            <div className="card-index-video">
              <video src="/multimedia/video pasteleria.mp4" loop autoPlay muted playsInline></video>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
