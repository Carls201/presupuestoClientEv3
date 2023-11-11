// Usuario.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eliminarUsuario, editarUsuario, fetchUsuarios } from '../redux/usuariosSlice';
import ModalDelete from "../components/modal/Modal";
import FormModalEdit from "../components/formEdit/FormEdit";
import TableData from "../components/table/Table";
import { fetchRoles } from "../redux/rolSlice";

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



      

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(editarUsuario(formValues));
        closeModalEdit();
    };


    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        
        if (e.target.tagName === 'SELECT') {
         
          setFormValues(prev => ({
            ...prev,
            [name]: parseInt(value, 10) 
          }));
        } else {
          
          setFormValues(prev => ({ ...prev, [name]: value }));
        }
      };
      
      
      
      
      

    const dispatch = useDispatch();
    const usuarioState = useSelector((state) => state.usuarios);
    const rolState = useSelector(state => state.roles);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [selectedUserEdit, setSelectedUserEdit] = useState(null);

    useEffect(() => { dispatch(fetchUsuarios())}, [usuarioState])
    useEffect(() => {dispatch(fetchRoles())}, []);


    //----------------------modalEdit-------------------------------------------------
    const showModalEdit = (usuario) => {
        const {rol1, ...usuarioN} = usuario;
        setFormValues({...usuarioN});
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

    // console.log(rolState.roles);
    return (
        <div>
            <h1>Usuarios</h1>
            
            <TableData
                data={usuarioState.usuarios}
                idField="idUsuario"
                onEdit={showModalEdit}
                onDelete={showModal}
            />

            

            <ModalDelete 
                isOpen={isModalOpen} 
                onRequestClose={closeModal} 
                entity={selectedUser} 
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
                    { name: 'idRol', label: 'Rol', type: 'select', options: rolState.roles.data.map(rol => ({
                        id: rol.idRol,
                        label: rol.rol1
                    })) 
                },
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



