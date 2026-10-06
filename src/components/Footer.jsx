import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="nav-footer">
      <nav>
        <div className="footer-contenedor">
          <p className="footer-texto">Pasteleria mil sabores &copy; 2026 - Todos los derechos reservados</p>
          <Link className="footer-link" to="/contactanos">Contactanos</Link>
        </div>
      </nav>
    </footer>
  );
}
