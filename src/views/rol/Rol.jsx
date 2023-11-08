import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles, eliminarRol, editarRol } from '../../redux/rolSlice';
import Modal from "../../components/modal/Modal";
import FormModalEdit from "../../components/formEdit/FormEdit";
import TableData from "../../components/table/Table";

const Rol = () => {

    const dispatch = useDispatch();
    const rolState = useSelector((state) => state.roles);
    

    // ESTADOS
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [selectedDelete, setSelectedDelete] = useState(null);

    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [selectedEdit, setSelectedEdit] = useState(null);

    const [formValues, setFormValues] = useState({
        idRol: '',
        rol1: ''
    });

    useEffect(() => {
        dispatch(fetchRoles());
    }, [rolState.roles]);

    // HANDLES
    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(editarRol(formValues));
        console.log(rolState);
        closeModalEdit();
    };

    // FUNCIONES

    // EDITAR
    const showModalEdit = (rol) => {
        setFormValues({...rol});
        setIsModalOpenEdit(true);
    };

    const closeModalEdit = () => {
        setIsModalOpenEdit(false);
        setSelectedEdit(null);
    };

    // ELIMINAR
    const showModalDelete = (rol) => {
        setSelectedDelete(rol);
        setIsModalOpenDelete(true);
    };

    const closeModalDelete = () => {
        setIsModalOpenDelete(false);
        setSelectedDelete(null);
    };

    // CONFIRMAR
    const confirmDelete = (id) => {
        dispatch(eliminarRol(id));
        closeModalDelete();
    };


    return (
        <div>
            <h1>Usuarios</h1>
            
            <TableData
                data={rolState.roles}
                idField="idRol"
                onEdit={showModalEdit}
                onDelete={showModalDelete}
            />

            <Modal 
                isOpen={isModalOpenDelete} 
                onRequestClose={closeModalDelete} 
                entity={selectedDelete} 
                idField="idRol"
                confirmDelete={confirmDelete} 
                entidad='rol1' 
                accion='eliminar'
            />

            <FormModalEdit 
                isOpen={isModalOpenEdit} 
                onRequestClose={closeModalEdit} 
                fields={[
                    { name: 'idRol', label: 'ID Rol', type: 'number', readOnly: true },
                    { name: 'rol1', label: 'Rol', type: 'text' },
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

export default Rol;