import { Link } from 'react-router-dom';

// mostrarInicio=false replica la página de inicio original, que no tenía el enlace "Inicio"
export default function Header({ mostrarInicio = true }) {
  return (
    <header className="nav-header">
      <nav className="nav-contenedor">
        <div className="header-logo">
          <img className="logo-img" src="/multimedia/logo pasteleria.png" alt="logo pasteleria" />

          <div>
            <h1 className="titulo-header">Pasteleria mil sabores</h1>
            <p className="eslogan-header">¡Celebra la dulzura de la vida con Pastelería 1000 Sabores!</p>
          </div>
        </div>

        <ul className="navbar-nav">
          {mostrarInicio && (
            <li className="item-nav">
              <Link to="/">Inicio</Link>
            </li>
          )}
          <li className="item-nav">
            <Link to="/catalogo">Catalogo</Link>
          </li>
          <li className="item-nav">
            <Link to="/carrito">Carrito</Link>
          </li>
          <li className="item-nav">
            <Link to="/usuario/inicio-sesion">Usuario</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
