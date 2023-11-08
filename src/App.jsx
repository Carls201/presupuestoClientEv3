import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './views/login/Login';
import Home from './views/home/Home';
import Usuario from './views/usuario/Usuario';
import MetaAhorro from './views/MetaAhorro/MetaAhorro';
import Navbar from './components/navBar/NavBar';

function App() {
  const location = useLocation();

  return (
    <>

      {location.pathname !== '/' && <Navbar/>}

    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/usuario' element={<Usuario/>}/>
      <Route path='/metaahorro' element={<MetaAhorro/>}/>
    </Routes>
    </>
  )
}

export default App
