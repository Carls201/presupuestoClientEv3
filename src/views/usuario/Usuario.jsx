// Usuario.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsuarios, eliminarUsuario, editarUsuario } from '../../redux/usuariosSlice';
import Modal from "../../components/modal/Modal";
import FormModalEdit from "../../components/formEdit/FormEdit";
import TableData from "../../components/table/Table";

const Usuario = () => {

    const [formValues, setFormValues] = useState({
        idUsuario: '',
        nombre: '',
        apellido: '',
        edad: '',
        direccion: '',
        email: '',
        rol: '',
        pass: '',
      });

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(editarUsuario(formValues));
        closeModalEdit();
    };

    const dispatch = useDispatch();
    const usuarioState = useSelector((state) => state.usuarios);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [selectedUserEdit, setSelectedUserEdit] = useState(null);

    useEffect(() => {
        dispatch(fetchUsuarios()); // Despacha la acción para obtener los usuarios
    }, [usuarioState.usuarios]);


    //----------------------modalEdit-------------------------------------------------
    const showModalEdit = (usuario) => {
        setFormValues({...usuario});
        setIsModalOpenEdit(true);
    };

     const closeModalEdit = () => {
        setIsModalOpenEdit(false);
        setSelectedUserEdit(null); 
    };

    //---------------------modalDelete--------------------------------------------
    const showModal = (usuario) => {
        setSelectedUser(usuario);
        setIsModalOpen(true);
    };

     // Función para cerrar el modal
     const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

   const confirmDelete = (id) => {
    dispatch(eliminarUsuario(id));
    closeModal();
    };

    
    return (
        <div>
            <h1>Usuarios</h1>
            
            <TableData
                data={usuarioState.usuarios}
                idField="idUsuario"
                onEdit={showModalEdit}
                onDelete={showModal}
            />

            

            <Modal 
                isOpen={isModalOpen} 
                onRequestClose={closeModal} 
                user={selectedUser} 
                idField="idUsuario"
                confirmDelete={confirmDelete} 
                entidad='usuario' 
                accion='eliminar'
            />
            <FormModalEdit 
                isOpen={isModalOpenEdit} 
                onRequestClose={closeModalEdit} 
                fields={[
                    { name: 'idUsuario', label: 'ID Usuario', type: 'number', readOnly: true },
                    { name: 'idRol', label: 'Rol', type: 'number' },
                    { name: 'nombre', label: 'Nombre', type: 'text' },
                    { name: 'apellido', label: 'Apellido', type: 'text' },
                    { name: 'edad', label: 'Edad', type: 'number' },
                    { name: 'direccion', label: 'Dirección', type: 'text' },
                    { name: 'email', label: 'Email', type: 'email' },
                    { name: 'pass', label: 'Contraseña', type: 'password' }
                ]}
                formValues={formValues}
                handleChange={handleFieldChange}
                handleSubmit={handleFormSubmit}
                initialValues={selectedUserEdit}
                entidad='Usuario'
            />

        </div>
    );
}

export default Usuario;



