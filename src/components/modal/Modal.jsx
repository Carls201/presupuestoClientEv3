// Modal.jsx
import React from 'react';
import ReactModal from 'react-modal';
import styles from './Modal.module.css'; // Importando el archivo de módulo CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

ReactModal.setAppElement('#root');

// Modal.jsx
// ... tus imports ...

const Modal = ({ isOpen, onRequestClose, user, confirmDelete, entidad, accion}) => {

  const overlayClassName = `${styles.overlay} ${isOpen ? styles.enter : styles.exit}`;
  const contentClassName = `${styles.content} ${isOpen ? styles.enter : styles.exit}`;

    
    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Modal"
        overlayClassName={overlayClassName}
        className={contentClassName}
      >
        <div className={styles.modalContent}>

          <button className={styles.closeButton} onClick={onRequestClose}>
          <FontAwesomeIcon icon={faCircleXmark} className={styles.closeIcon}/>
          </button>

          <FontAwesomeIcon icon={faCircleExclamation} className={styles.iconExclamation}/>
          <div className={styles.text}>
            {/* Aquí iría el texto del modal */}
            ¿Estás seguro de que quieres {accion} {entidad}?
            <br/>ID del {entidad}: {user && user.id}
          </div>
          <div className={styles.buttons}>
            <button className={styles.button} onClick={()=>confirmDelete(user.id)}>Confirmar</button>
          </div>
        </div>

      </ReactModal>
    );
  }
  
  export default Modal;
  

