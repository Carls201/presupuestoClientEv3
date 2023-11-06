import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './views/login/Login';
import FormRegister from './views/FormRegister/FormRegister';
import Home from './views/home/Home';
import Usuario from './views/usuario/Usuario';
import MetaAhorro from './views/MetaAhorro/MetaAhorro';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/formRegister' element={<FormRegister/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/usuario' element={<Usuario/>}/>
      <Route path='/metaahorro' element={<MetaAhorro/>}/>
    </Routes>
  )
}

export default App
