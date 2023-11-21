// Usuario.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eliminarUsuario, editarUsuario, fetchUsuarios } from '../redux/usuariosSlice';
import ModalDelete from "../components/modal/Modal";
import FormModalEdit from "../components/formEdit/FormEdit";
import TableData from "../components/table/Table";
import { fetchRoles } from "../redux/rolSlice";

const Usuario = () => {


    const dispatch = useDispatch();
    const usuarioState = useSelector((state) => state.usuarios);
    const rolState = useSelector(state => state.roles);

    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [selectedDelete, setSelectedDelete] = useState(null);

    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [selectedEdit, setSelectedEdit] = useState(null);

    const [formValues, setFormValues] = useState({
        idUsuario: '',
        idRol: '',
        nombre: '',
        apellido: '',
        edad: '',
        direccion: '',
        email: '',
        pass: '',
    });


    useEffect(() => { dispatch(fetchUsuarios()) }, [dispatch]);
    useEffect(() => { dispatch(fetchRoles()) }, [dispatch]);

      
    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'idRol') {
         
            const rolSelected = rolOptions.find(option => option.id.toString() === value);

          setFormValues(prev => ({
            ...prev,
            idRol: parseInt(value, 10),
            rol: rolSelected ? rolSelected.label : ''
          }));

        } else {
          
          setFormValues(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(editarUsuario(formValues));
        closeModalEdit();
    };


      
      
      
      
      

    

    

    


    //----------------------modalEdit-------------------------------------------------
    const showModalEdit = (data) => {

        console.log(data);
        const rolId = rolOptions.find(rol => rol.label === data.rol)?.id;

        
        
        const initialValues = {
            idUsuario: data.idUsuario,
            idRol: rolId || '',
            nombre: data.nombre,
            apellido: data.apellido,
            edad: data.edad,
            direccion: data.direccion,
            email: data.email,
            pass: data.pass
        };

        setFormValues(initialValues);
        setIsModalOpenEdit(true);
    };

     const closeModalEdit = () => {
        setIsModalOpenEdit(false);
        setSelectedEdit(null); 
    };

    //---------------------modalDelete--------------------------------------------
    const showModalDelete = (data) => {
        setSelectedDelete(data);
        setIsModalOpenDelete(true);
    };

     // Función para cerrar el modal
     const closeModalDelete = () => {
        setIsModalOpenDelete(false);
        setSelectedDelete(null);
    };

   const confirmDelete = (id) => {
        dispatch(eliminarUsuario(id));
        closeModalDelete();
    };

    const rolOptions = rolState.roles && Array.isArray(rolState.roles)
        ? rolState.roles.map(rol => ({
            id: rol.idRol,
            label: rol.rol1
        }))
        :[];

    // console.log(rolState.roles);
    return (
        <div>
            <h1>Usuarios</h1>
            
            <TableData
                data={usuarioState.usuarios}
                idField="idUsuario"
                onEdit={showModalEdit}
                onDelete={showModalDelete}
            />

            

            <ModalDelete 
                isOpen={isModalOpenDelete} 
                onRequestClose={closeModalDelete} 
                entity={selectedDelete} 
                idField="idUsuario"
                confirmDelete={confirmDelete} 
                entidad='Usuario' 
                accion='eliminar'
            />
            <FormModalEdit 
                isOpen={isModalOpenEdit} 
                onRequestClose={closeModalEdit} 
                fields={[
                    { name: 'idUsuario', label: 'ID Usuario', type: 'number', readOnly: true },
                    { name: 'idRol', label: 'Rol', type: 'select', options: rolOptions},
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
                initialValues={selectedEdit}
                entidad='Usuario'
            />

        </div>
    );
}

export default Usuario;



