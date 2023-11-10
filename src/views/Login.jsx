import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ingresarUsuario } from '../redux/loginSlice';
import { crearUsuario } from '../redux/usuariosSlice';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../API/auth';
import {Tabs, Tab, Input, Button, Card, CardBody, CardHeader} from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

const Login = () => {

  const [selected, setSelected] = React.useState("login");

  
  const [user, setUser] = useState({
    email: '',
    pass: ''
  });

  const [userCreate, setUserCreate] = useState({

    Nombre: '',
    Apellido: '',
    Edad: '',
    Direccion: '',
    Email: '',
    Pass: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // login state
  const loginState = useSelector((state) => state.login);
  const { usuario, error, success, message } = loginState;
  
  // usuario state
  const usuarioState = useSelector((state) => state.usuarios);
  
 
  useEffect(() => {
    if (success && usuario && usuario.data) {
      saveToken(usuario.data); 
      navigate('/home');
    }
  },[usuario, success, navigate]);

  useEffect(() => {
    if(usuarioState.success){
      setSelected('login');
      setUserCreate({
        Nombre: '',
        Apellido: '',
        Edad: '',
        Direccion: '',
        Email: '',
        Pass: '',
        IdRol: '',
      });
    }
  }, [usuarioState])

  

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  const handleChangeRegister = (e) => {
    setUserCreate({...userCreate, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(ingresarUsuario(user));
    


  }

  const handleSubmitRegister = (e) =>{
    e.preventDefault();
    dispatch(crearUsuario(userCreate));
    
  };

  // const renderFeedback = () => {
  //   if(error) {
  //     return <p>{error.message}</p>;
  //   }
  // }


  return (
    // <div className='flex items-center justify-center h-screen'>

      <div className="flex flex-col w-full absolute inset-0 items-center justify-center" >
        <Card className="max-w-full w-[340px] h-[400px]">
          <CardBody className="overflow-auto">
            <Tabs
              fullWidth
              size="md"
              aria-label="Tabs form"
              selectedKey={selected}
              onSelectionChange={setSelected}
            >
              {/* Login */}
              <Tab key="login" title="Login">

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                  <FontAwesomeIcon className='mt-2 text-8xl text-rose-700' icon={faCircleUser}/>
                  <Input 
                    isRequired label="Correo" 
                    placeholder="Ingresa tu correo" 
                    type="email" 
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    
                  />

                  <Input
                    
                    isRequired
                    label="Contraseña"
                    placeholder="Ingresa tu contraseña"
                    type="password"
                    name="pass"
                    value={user.pass}
                    onChange={handleChange}
                  />
                  
                  <div className="flex gap-2 justify-end">
                    <Button fullWidth color="danger" variant='bordered' type='submit'>
                      Entrar
                    </Button>
                  </div>
                </form>

              </Tab>

              {/* Registro */}
              <Tab key="sign-up" title="Sign up">
                <form className="flex flex-col gap-4 h-[300px]" onSubmit={handleSubmitRegister}>

                  {Object.keys(userCreate).map((key) => (
                    <Input
                      isRequired
                      label={key}
                      placeholder={`Ingresa ${key}`}
                      type={key === 'Pass'? 'password': 'text'}
                      name={key}
                      value={userCreate[key]}
                      onChange={handleChangeRegister}
                    />
                  ))}

                
                  
                  <div className="mb-10 flex gap-2 justify-end">
                    <Button className='mb-5' fullWidth color="danger" variant='bordered' type='submit'>
                      Registrar
                    </Button>
                  </div>
                </form>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    // </div>
  );
};

export default Login;
