import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { crearUsuario } from '../../redux/usuariosSlice'; // Asegúrate de que la ruta al slice sea correcta
import styles from './FormRegister.module.css';
import { useNavigate } from 'react-router-dom';

const FormRegister = () => {
  const [user, setUser] = useState({
    Nombre: '',
    Apellido: '',
    Edad: '',
    Direccion: '',
    Email: '',
    Pass: '',
    IdRol: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usuarioState = useSelector((state) => state.usuarios);
  const { usuario, error, success, message } = usuarioState;

  useEffect(() => {
    if (success) {
      navigate('/'); // Redirecciona a la ruta principal cuando el registro es exitoso
    }
  }, [success, navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(crearUsuario(user)); // Despacha la acción de crearUsuario
  };

  // Puedes incluir una respuesta visual basada en el estado del registro
  const renderFeedback = () => {
    if (error) {
      return <p className={styles.errorMsg}>{message}</p>;
    } 
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Registrar Usuario</h2>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        {Object.keys(user).map((key) => (
          <div key={key} className={styles.inputContainer}>
            <label className={styles.label}>{key}</label>
            <input
              className={styles.input}
              type={key === 'Pass' ? 'password' : 'text'}
              name={key}
              value={user[key]}
              onChange={handleChange}
              required={key !== 'IdRol'} // Suponiendo que IdRol no es obligatorio
            />
          </div>
        ))}
        <button type="submit" className={styles.loginButton}>
          Registrar
        </button>
      </form>
      {renderFeedback()}
    </div>
  );
};

export default FormRegister;
