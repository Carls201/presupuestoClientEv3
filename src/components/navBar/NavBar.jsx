import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cerrarSesion } from '../../redux/loginSlice';
import { resetUsuario } from '../../redux/usuariosSlice';
import styles from './NavBar.module.css';
import { jwtDecode } from 'jwt-decode';

const NavbarC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(cerrarSesion());
    dispatch(resetUsuario());
    navigate('/');
  };

  const token = localStorage.getItem('userToken');
  const decodedToken = jwtDecode(token);
  const decoId = parseInt(decodedToken?.IdRol); // Asegúrate de manejar null o undefined

  return (
    <div className={styles.navbar}>
      <NavLink to='/home' className={({ isActive }) => (isActive ? styles.active : styles.navItem)}>Inicio</NavLink>

      {decoId === 1 && (
        <>
          <NavLink to='/rol' className={({ isActive }) => (isActive ? styles.active : styles.navItem)}>Roles</NavLink>
          <NavLink to='/usuario' className={({ isActive }) => (isActive ? styles.active : styles.navItem)}>Usuarios</NavLink>
        </>
      )}
      
      <NavLink to='/ahorro' className={({ isActive }) => (isActive ? styles.active : styles.navItem)}>Ahorro</NavLink>
      <NavLink to='/metaahorro' className={({ isActive }) => (isActive ? styles.active : styles.navItem)}>MetaAhorro</NavLink>
      <NavLink to='/fuente' className={({ isActive }) => (isActive ? styles.active : styles.navItem)}>FuenteIngreso</NavLink>
      <NavLink to='/ingreso' className={({ isActive }) => (isActive ? styles.active : styles.navItem)}>Ingresos</NavLink>
      <NavLink to='/categoria' className={({ isActive }) => (isActive ? styles.active : styles.navItem)}>Categoria Gastos</NavLink>
      <NavLink to='/gasto' className={({ isActive }) => (isActive ? styles.active : styles.navItem)}>Gastos</NavLink>

      <button onClick={handleLogout} className={styles.navItem}>Salir</button>
    </div>
  );
};

export default NavbarC;


