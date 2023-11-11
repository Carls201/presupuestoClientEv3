import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './views/Login';
import Home from './views/Home';
import Usuario from './views/Usuario';
import MetaAhorro from './views/MetaAhorro';
import Navbar from './components/navBar/NavBar';
import Rol from './views/Rol';
import Ahorro from './views/Ahorro';
import { jwtDecode } from 'jwt-decode';

function App() {
  const location = useLocation();
  const rol = parseInt(jwtDecode(localStorage.getItem('userToken')).IdRol);
  

  return (
    <>

      {location.pathname !== '/' && <Navbar/>}

    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>

      {rol === 25 && (
        <>
          <Route path='/usuario' element={<Usuario/>}/>
          <Route path='/rol' element={<Rol/>}/>
        </>
      )}

      <Route path='/metaahorro' element={<MetaAhorro/>}/>
      <Route path='/ahorro' element={<Ahorro/>}/>
    </Routes>
    </>
  )
}

export default App
