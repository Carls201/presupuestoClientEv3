import {useState, useEffect, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ingresarUsuario } from '../redux/loginSlice';
import { crearUsuario } from '../redux/usuariosSlice';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../API/auth';
import {Tabs, Tab, Input, Button, Card, CardBody, CardHeader} from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import ErrorLogin from '../components/ErrorLogin';

const Login = () => {

  // Estados
  const [selected, setSelected] = useState("login");
  const [submitMessage, setSubmitMessage] = useState('');
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
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    pass: '',
  });
  const loginState = useSelector((state) => state.login);
  const { usuario, error, success, message } = loginState;
  const usuarioState = useSelector((state) => state.usuarios);
  console.log(loginState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  
  // Validar campos en tiempo real
  const validateField = useCallback((name, value) =>{
    if(!value.trim()) 
      setValidationErrors(prev => ({ ...prev, [name]: 'Este campo es obligatorio' }));
    else 
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
  },[]);

  const handleUserChange = useCallback((e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value.replace(/\s/g, '') }));
    validateField(name, value);
  }, [validateField]);

  const handleUserCreateChange = useCallback((e) => {
    const { name, value } = e.target;
    setUserCreate(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  }, [validateField]);
 
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setSubmitMessage('');

    if(!user.email.trim() || !user.pass.trim()){
      setTimeout( () => setSubmitMessage('Completa todos los campos'), 500);
      return;
    }

    dispatch(ingresarUsuario(user));
    setTimeout(setSubmitMessage('Usuairo o contrseña incorrecto...'), 0);

  },[user, dispatch]);

  const handleSubmitRegister = useCallback((e) =>{
    e.preventDefault();
    setSubmitMessage('');

    dispatch(crearUsuario(userCreate));
    setTimeout( ()=>setSubmitMessage('Registrando Usuario...'), 500);
    
  },[userCreate, dispatch]);

  const handleTabChange = (newSelectedTab) => {
    if (newSelectedTab !== selected) {
      setSelected(newSelectedTab);
      setSubmitMessage('');
    }
  };


  console.log(submitMessage);
  return (
    <div className="flex flex-col w-full absolute inset-0 items-center justify-center">
      <Card className="max-w-full w-[340px] h-[460px]">
        <CardBody className="overflow-auto">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={handleTabChange}
          >
            {/* Login */}
            <Tab key="login" title="Login">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <FontAwesomeIcon className='mt-2 text-8xl text-rose-700' icon={faCircleUser}/>
                <Input 
                  label="Correo" 
                  placeholder="Ingresa tu correo" 
                  type="email" 
                  name="email"
                  value={user.email}
                  onChange={handleUserChange}
                />
                {submitMessage && <ErrorLogin error={submitMessage}/>}
                <Input
                  label="Contraseña"
                  placeholder="Ingresa tu contraseña"
                  type="password"
                  name="pass"
                  value={user.pass}
                  onChange={handleUserChange}
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
                    label={key}
                    placeholder={`Ingresa ${key}`}
                    type={key === 'Pass' ? 'password' : 'text'}
                    name={key}
                    value={userCreate[key]}
                    onChange={handleUserCreateChange}
                  />
                ))}
                {submitMessage && <ErrorLogin error={submitMessage}/>}
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
  );
};

export default Login;
