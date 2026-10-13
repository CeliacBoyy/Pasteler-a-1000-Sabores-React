import { Navigate } from 'react-router-dom';
import { esAdmin } from '../utils/sesion.js';

export default function RutaAdmin({ children }) {
  if (!esAdmin()) {
    return <Navigate to="/usuario/inicio-sesion" replace />;
  }
  return children;
}
