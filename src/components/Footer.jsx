import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="nav-footer mt-auto py-3">
      <div className="container">
        <div className="footer-contenedor d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <p className="footer-texto mb-0">Pasteleria mil sabores &copy; 2026 - Todos los derechos reservados</p>
          <Link className="footer-link" to="/contactanos">Contactanos</Link>
        </div>
      </div>
    </footer>
  );
}