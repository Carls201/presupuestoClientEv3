import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { crearMetaAhorro } from '../../redux/metaahorroSlice'
import styles from './MetaAhorro.module.css';

const MetaAhorro = () => {
  const [name, setName] = useState({
    nombre: ''
  });

  const dispatch = useDispatch();

  const metaAhorroState = useSelector((state) => state.metaAhorro); 
  const {
    metaahorro,
    error,
    success,
    message } = metaAhorroState;


  useEffect(() => {
    
      console.log(metaAhorroState);
    
  }, [message])

  const handleChange = (e) => {
    setName({...name,[e.target.name]:e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí despacharías una acción de Redux o harías algún proceso con el nombre
    dispatch (crearMetaAhorro(name));
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
            name="nombre"
            value={name.nombre}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className={styles.metaAhorroButton}>Enviar</button>
      </form>
    </div>
  );
};

export default MetaAhorro;
