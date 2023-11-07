import {useState, useEffect} from 'react';
import ReactModal from 'react-modal';
import styles from './FormEdit.module.css';
import { useDispatch } from 'react-redux';
import { editarUsuario } from '../../redux/usuariosSlice';
ReactModal.setAppElement('#root');

// Modal.jsx
// ... tus imports ...

const FormModalEdit = ({ isOpen, onRequestClose, user, entidad }) => {

    const overlayClassName = `${styles.overlay} ${isOpen ? styles.enter : styles.exit}`;
    const contentClassName = `${styles.content} ${isOpen ? styles.enter : styles.exit}`;
    const dispatch = useDispatch();

    const [users, setUser] = useState({
        idUsuario: '',
        idRol: '',
        nombre: '',
        apellido: '',
        edad: '',
        direccion: '',
        email: '',
        pass: ''
      });
    user && console.log(user);

    useEffect(() => {
        if (user) {
            setUser({
                idUsuario: user.id || '',
                idRol: user.rol || '',
                nombre: user.nombre || '',
                apellido: user.apellido || '',
                edad: user.edad || '',
                direccion: user.direccion || '',
                email: user.email || '',
                pass: user.pass || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setUser({...users, [e.target.name]: e.target.value});
    };

    const inputs = user ? Object.entries(user).map(([key, value]) => {
        if (key === 'pass') return (
            <div className={styles.contentInput}>
                <label className={styles.label}>{key}</label>
                <input key={key} className={styles.input} type="password" name={key} value={users[key]} onChange={handleChange}/>
            </div>
        )

        else if (key === 'email') return (
            <div className={styles.contentInput}>
                <label className={styles.label}>{key}</label>
                <input key={key} className={styles.input} type="email" name={key} value={users[key]} onChange={handleChange}/>
            </div>
        )

        else if (typeof value === 'number') return (
            <div className={styles.contentInput}>
                <label className={styles.label}>{key}</label>
                <input key={key} className={styles.input} type="number" name={key} value={users[key]} onChange={handleChange}/>
            </div>
        )

        else return (
            <div className={styles.contentInput}>
                <label className={styles.label}>{key}</label>
                <input key={key} className={styles.input} type="text" name={key} value={users[key]} onChange={handleChange}/>
            </div>
        )
    }) : null;

    


    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(editarUsuario(users));
    }

    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Modal"
        overlayClassName={overlayClassName}
        className={contentClassName}

      >
        {/* AGREGAR FORMULARIO */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.text}>Registrar {entidad}</h2>
          {inputs}
          
          <button className={`${styles.button} ${styles.submitButton}`} type="submit">Editar</button>
        </form>

      </ReactModal>
    );
  }
  
  export default FormModalEdit;