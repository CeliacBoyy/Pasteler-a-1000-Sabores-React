import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import useTitulo from '../utils/useTitulo.js';
import estilos from '../styles/usuario.css?inline';

export default function InicioSesion() {
  useTitulo('Inicio de Sesión - Pastelería 1000 Sabores');

  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));

    if (!usuarioGuardado) {
      alert('No existe ningún usuario registrado.');
      return;
    }
    if (correo === usuarioGuardado.correo && contrasena === usuarioGuardado.contrasena) {
      alert('Inicio de sesión correcto.');
      navigate('/');
    } else {
      alert('Correo o contraseña incorrectos.');
    }
  };

  return (
    <>
      <style>{estilos}</style>

      <Header />

      {/* Principal */}
      <main className="contenido-principal">
        <section className="seccion-login">
          <h2 className="titulo-seccion">Inicio de Sesión </h2>
          <p className="descripcion">Ingresa a tu cuenta.</p>

          {/* Formulario */}
          <form className="formulario-login" onSubmit={handleSubmit}>
            <div className="campo-formulario">
              <label className="etiqueta" htmlFor="correo">Correo electrónico:</label>
              <br />
              <input
                className="campo"
                type="email"
                id="correo"
                name="correo"
                required
                value={correo}
                onChange={e => setCorreo(e.target.value)}
              />
            </div>

            <div className="campo-formulario">
              <label className="etiqueta" htmlFor="contrasena">Contraseña:</label>
              <br />
              <input
                className="campo"
                type="password"
                id="contrasena"
                name="contrasena"
                required
                value={contrasena}
                onChange={e => setContrasena(e.target.value)}
              />
            </div>
            <button className="boton" type="submit">Iniciar Sesión</button>
          </form>
          <p className="texto-registro">
            ¿Todavia no tienes cuenta?{' '}
            <Link className="enlace-registro" to="/usuario/registro">Regístrate aqui</Link>
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
