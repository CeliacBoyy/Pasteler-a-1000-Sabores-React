import { Link } from 'react-router-dom';

// mostrarInicio=false replica la página de inicio original, que no tenía el enlace "Inicio"
export default function Header({ mostrarInicio = true }) {
  return (
    <header className="nav-header">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <div className="navbar-brand d-flex align-items-center">
            <img
              className="logo-img me-2"
              src="/multimedia/logo pasteleria.png"
              alt="logo pasteleria"
              height="56"
            />
            <div>
              <h1 className="titulo-header h4 mb-0">Pasteleria mil sabores</h1>
              <p className="eslogan-header small mb-0 d-none d-md-block">
                ¡Celebra la dulzura de la vida con Pastelería 1000 Sabores!
              </p>
            </div>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menuPrincipal"
            aria-controls="menuPrincipal"
            aria-expanded="false"
            aria-label="Mostrar menú"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="menuPrincipal">
            <ul className="navbar-nav ms-auto">
              {mostrarInicio && (
                <li className="nav-item item-nav">
                  <Link className="nav-link" to="/">Inicio</Link>
                </li>
              )}
              <li className="nav-item item-nav">
                <Link className="nav-link" to="/catalogo">Catalogo</Link>
              </li>
              <li className="nav-item item-nav">
                <Link className="nav-link" to="/carrito">Carrito</Link>
              </li>
              <li className="nav-item item-nav">
                <Link className="nav-link" to="/usuario/inicio-sesion">Usuario</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}