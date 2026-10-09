import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import useTitulo from '../utils/useTitulo.js';
import estilos from '../styles/usuario.css?inline';

export default function Registro() {
  useTitulo('Registro de Usuario - Pastelería 1000 Sabores');

  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    if (contrasena !== confirmarContrasena) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const nuevoUsuario = {
      nombre,
      correo,
      contrasena,
      rol: 'cliente'
    };

    localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
    alert('Usuario registrado con éxito. Ahora puedes iniciar sesión.');
    navigate('/usuario/login');
  };

  return (
    <>
      <style>{estilos}</style>

      <Header />

      <main className="contenido-principal">
        <section className="seccion-registro">
          <h2 className="titulo-seccion">Crear Cuenta</h2>
          <p className="descripcion">Regístrate para acceder a todos nuestros beneficios.</p>

          <form className="formulario-registro" onSubmit={handleSubmit}>
            <div className="campo-formulario">
              <label className="etiqueta" htmlFor="nombre">Nombre completo:</label>
              <input
                className="campo"
                type="text"
                id="nombre"
                name="nombre"
                required
                value={nombre}
                onChange={e => setNombre(e.target.value)}
              />
            </div>

            <div className="campo-formulario">
              <label className="etiqueta" htmlFor="correo">Correo electrónico:</label>
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

            <div className="campo-formulario">
              <label className="etiqueta" htmlFor="confirmarContrasena">Confirmar contraseña:</label>
              <input
                className="campo"
                type="password"
                id="confirmarContrasena"
                name="confirmarContrasena"
                required
                value={confirmarContrasena}
                onChange={e => setConfirmarContrasena(e.target.value)}
              />
            </div>

            <button className="boton" type="submit">Registrarse</button>
          </form>

          <p className="texto-registro">
            ¿Ya tienes una cuenta?{' '}
            <Link className="enlace-registro" to="/usuario/login">Inicia sesión aquí</Link>
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}