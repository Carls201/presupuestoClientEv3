import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { crearMetaAhorro } from '../../redux/metaahorroSlice'
import styles from './MetaAhorro.module.css';

const MetaAhorro = () => {
  const [name, setName] = useState({
    Name: ''
  });

  const dispatch = useDispatch();

  const metaAhorroState = useSelector((state) => state.metaAhorro);
  const {
    metaahorro,
    error,
    success,
    message } = metaAhorroState;

  const handleChange = (e) => {
    setName({...name,[e.target.name]:e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí despacharías una acción de Redux o harías algún proceso con el nombre
    dispatch (crearMetaAhorro(name));
    console.log(metaAhorroState);
  };

  return (
    <div className={styles.metaAhorroContainer}> {/* Puedes reutilizar estilos de loginContainer */}
      <h2 className={styles.metaAhorroTitle}>Ingresar Nombre</h2>
      <form className={styles.metaAhorroForm} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Nombre</label>
          <input 
            className={styles.input}
            type="text"
            name="name"
            value={name.Name}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className={styles.metaAhorroButton}>Enviar</button>
      </form>
    </div>
  );
};

export default MetaAhorro;
