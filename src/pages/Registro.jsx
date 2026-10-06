import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import useTitulo from '../utils/useTitulo.js';
import { validarRut } from '../utils/validarRut.js';
import estilos from '../styles/usuario.css?inline';

export default function Registro() {
  useTitulo('Registro - Pastelería 1000 Sabores');

  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    rut: '',
    correo: '',
    contrasena: '',
    confirmar: ''
  });

  const handleChange = campo => e => setForm({ ...form, [campo]: e.target.value });

  const handleSubmit = event => {
    event.preventDefault();

    if (!validarRut(form.rut)) {
      alert('El RUT ingresado no es válido.');
      return;
    }
    if (form.contrasena !== form.confirmar) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    const usuario = {
      nombre: form.nombre,
      apellido: form.apellido,
      rut: form.rut,
      correo: form.correo,
      contrasena: form.contrasena
    };
    localStorage.setItem('usuario', JSON.stringify(usuario));
    alert('Registro realizado correctamente.');
    navigate('/usuario/inicio-sesion');
  };

  return (
    <>
      <style>{estilos}</style>

      <Header />

      {/* Contenido principal */}
      <main className="contenido-principal">
        <section className="seccion-registro">
          <h2 className="titulo-seccion">Registro de Usuario</h2>
          <p className="descripcion">Crea una cuenta en Pastelería 1000 Sabores.</p>
          {/* Formulario */}
          <form className="formulario-registro" onSubmit={handleSubmit}>
            <div className="campo-formulario">
              <label className="etiqueta" htmlFor="nombre">Nombre:</label>
              <br />
              <input className="campo" type="text" id="nombre" name="nombre" required
                value={form.nombre} onChange={handleChange('nombre')} />
            </div>

            <div className="campo-formulario">
              <label className="etiqueta" htmlFor="apellido">Apellido:</label>
              <br />
              <input className="campo" type="text" id="apellido" name="apellido" required
                value={form.apellido} onChange={handleChange('apellido')} />
            </div>

            <div className="campo-formulario">
              <label className="etiqueta" htmlFor="rut">Rut:</label>
              <br />
              <input className="campo" type="text" id="rut" name="rut" placeholder="12345678-9" required
                value={form.rut} onChange={handleChange('rut')} />
            </div>

            <div className="campo-formulario">
              <label className="etiqueta" htmlFor="correo">Correo electrónico:</label>
              <br />
              <input className="campo" type="email" id="correo" name="correo" required
                value={form.correo} onChange={handleChange('correo')} />
            </div>

            <div className="campo-formulario">
              <label className="etiqueta" htmlFor="contrasena"> Contraseña:</label>
              <br />
              <input className="campo" type="password" id="contrasena" name="contrasena" required
                value={form.contrasena} onChange={handleChange('contrasena')} />
            </div>

            <div className="campo-formulario">
              <label className="etiqueta" htmlFor="confirmar-contrasena">Confirmar contraseña:</label>
              <br />
              <input className="campo" type="password" id="confirmar-contrasena" name="confirmar-contrasena" required
                value={form.confirmar} onChange={handleChange('confirmar')} />
            </div>

            <button className="boton" type="submit">Registrarse</button>
          </form>

          <p className="texto-login">
            ¿Ya tienes una cuenta?{' '}
            <Link className="enlace-login" to="/usuario/inicio-sesion">Inicia sesión aquí</Link>
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
