import React, { useEffect } from 'react';
import ReactModal from 'react-modal';
import styles from './FormEdit.module.css';
ReactModal.setAppElement('#root');

const FormModalEdit = ({ isOpen, onRequestClose, fields, formValues, handleChange, handleSubmit, entidad }) => {
    const overlayClassName = `${styles.overlay} ${isOpen ? styles.enter : styles.exit}`;
    const contentClassName = `${styles.content} ${isOpen ? styles.enter : styles.exit}`;

    const inputElements = fields.map((field) => (
        <div className={styles.contentInput} key={field.name}>
            <label className={styles.label}>{field.label}</label>
            <input
                className={styles.input}
                type={field.type}
                name={field.name}
                value={formValues[field.name] || ''}
                onChange={handleChange}
                readOnly={field.readOnly && true}
            />
        </div>
    ));

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Edit Modal"
            overlayClassName={overlayClassName}
            className={contentClassName}
        >
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.text}>Editar {entidad}</h2>
                {inputElements}
                <button className={`${styles.button} ${styles.submitButton}`} type="submit">
                    Editar
                </button>
            </form>
        </ReactModal>
    );
};

export default FormModalEdit;