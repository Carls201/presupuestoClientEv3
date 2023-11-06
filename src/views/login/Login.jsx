import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ingresarUsuario } from '../../redux/loginSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import { saveToken } from '../../API/auth';


const Login = () => {

  const [user, setUser] = useState({
    email: '',
    pass: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.login);
  const { usuario, error, success, message } = loginState;
  
  useEffect(() => {
    if(success){
      navigate('/home');
    }
  },[success, navigate]);

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(ingresarUsuario(user));

    if(usuario && usuario.data) {
      saveToken(usuario.data);
      
    }

  }

  const renderFeedback = () => {
    if(error) {
      return <p className={styles.errorMsg}>{error.message}</p>;
    }
  }


  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Iniciar Sesión</h2>
      <form className={styles.loginForm} onSubmit={handleSubmit}>

        {Object.keys(user).map((key) => (
          <div key={key} className={styles.inputContainer}>
            <label className={styles.label}>{key}</label>
            <input 
              className={styles.input}
              type={key === 'pass'?'password':'text'}
              name={key}
              value={user[key]}
              onChange={handleChange}
            />

          </div>
        ))

        }

        <button type="submit" className={styles.loginButton}>Entrar</button>
        <Link to="/formRegister" className={styles.registerLink}>Registro</Link>
      </form>
      {renderFeedback()}
    </div>
  );
};

export default Login;
