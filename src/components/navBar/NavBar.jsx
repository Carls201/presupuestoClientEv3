// import React from 'react';
// import styles from './NavBar.module.css';
// import { NavLink } from 'react-router-dom';

// const Navbar = () => {
    

//   return (
//     <div className={styles.navbar}>
//       <NavLink to='/home' className={styles.navItem}>Inicio</NavLink>
//       <NavLink to='/roles' className={styles.navItem}>Roles</NavLink>
//       <NavLink to='/usuario' className={styles.navItem}>Usuarios</NavLink>
//       <NavLink to='/ahorro' className={styles.navItem}>Ahorro</NavLink>
//       <NavLink to='/metaahorro' className={styles.navItem}>MetaAhorro</NavLink>
//       <NavLink to='/' className={styles.navItem}>Salir</NavLink>
      
//     </div>
//   );
// };

// export default Navbar;

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cerrarSesion } from '../../redux/loginSlice'; // Importa la acción de cierre de sesión
import styles from './NavBar.module.css';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(cerrarSesion()); // Despacha la acción de cierre de sesión
    navigate('/'); // Navega a la página de login
  };

  return (
    <div className={styles.navbar}>
      {/* Tus otros NavLink aquí */}
        <NavLink to='/home' className={styles.navItem}>Inicio</NavLink>
        <NavLink to='/roles' className={styles.navItem}>Roles</NavLink>
        <NavLink to='/usuario' className={styles.navItem}>Usuarios</NavLink>
        <NavLink to='/ahorro' className={styles.navItem}>Ahorro</NavLink>
        <NavLink to='/metaahorro' className={styles.navItem}>MetaAhorro</NavLink>
        <NavLink to="/" className={styles.navItem} onClick={handleLogout}>Salir</NavLink>
    </div>
  );
};

export default Navbar;

