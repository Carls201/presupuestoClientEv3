import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cerrarSesion } from '../../redux/loginSlice'; // Importa la acción de cierre de sesión
import { resetUsuario } from '../../redux/usuariosSlice';
import styles from './NavBar.module.css';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(cerrarSesion());
    dispatch(resetUsuario());
    navigate('/'); 
  };

  const token = localStorage.getItem('userToken');
  const decoId = parseInt(jwtDecode(token).IdRol);
  console.log(typeof decoId);//28
  
  return (
    <div className={styles.navbar}>
      
        <NavLink to='/home' className={styles.navItem}>Inicio</NavLink>

        {decoId === 25 && (
          <>
            <NavLink to='/rol' className={styles.navItem}>Roles</NavLink>
            <NavLink to='/usuario' className={styles.navItem}>Usuarios</NavLink>
          </>
        )}
        
        

        <NavLink to='/ahorro' className={styles.navItem}>Ahorro</NavLink>
        <NavLink to='/metaahorro' className={styles.navItem}>MetaAhorro</NavLink>
        <NavLink to="/" className={styles.navItem} onClick={handleLogout}>Salir</NavLink>
    </div>
  );
};

export default Navbar;

