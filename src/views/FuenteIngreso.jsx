import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFuentes, eliminarFuente, editarFuente, crearFuente } from '../redux/fuenteSlice';
import ModalDelete from "../components/modal/Modal";
import FormModalEdit from "../components/formEdit/FormEdit";
import TableData from "../components/table/Table";
import {  Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, } from "@nextui-org/react";
import DynamicForm from "../components/DynamicForm/DynamicForm";


const FuenteIngreso = () => {

    const dispatch = useDispatch();
    const fuenteState = useSelector((state) => state.fuentes);
    

    // ESTADOS
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [selectedDelete, setSelectedDelete] = useState(null);

    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [selectedEdit, setSelectedEdit] = useState(null);

    const [formValues, setFormValues] = useState({
        idFuente: '',
        nombre: ''
    });

    useEffect(() => {
        dispatch(fetchFuentes());
    }, [fuenteState.fuentes]);


    // HANDLES
    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(editarFuente(formValues));
        closeModalEdit();
    };

    // FUNCIONES

    // EDITAR
    const showModalEdit = (data) => {
        setFormValues({...data});
        setIsModalOpenEdit(true);
    };

    const closeModalEdit = () => {
        setIsModalOpenEdit(false);
        setSelectedEdit(null);
    };

    // ELIMINAR
    const showModalDelete = (data) => {
        setSelectedDelete(data);
        setIsModalOpenDelete(true);
    };

    const closeModalDelete = () => {
        setIsModalOpenDelete(false);
        setSelectedDelete(null);
    };

    // CONFIRMAR
    const confirmDelete = (id) => {
        dispatch(eliminarFuente(id));
        closeModalDelete();
    };


    
 
     // Guardar Rol
    const handleSave = (data, onClose) => {
        dispatch(crearFuente(data));
        onClose();
    };

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <div>
            <h1 className="my-5 text-center text-2xl">Fuentes de Ingreso</h1>
            <Button className="ml-10 my-5" color="success" onPress={onOpen}>Agregar Fuente</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <DynamicForm
                                    formData={[
                                        { name: 'nombre', label: 'Fuente', type: 'text', defaultValue: '' },
                                    ]}

                                    handleSave={handleSave}
                                    onClose={onClose}
                                />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <TableData
                data={fuenteState.fuentes}
                idField="idFuente"
                onEdit={showModalEdit}
                onDelete={showModalDelete}
            />

            <ModalDelete
                isOpen={isModalOpenDelete} 
                onRequestClose={closeModalDelete} 
                entity={selectedDelete} 
                idField="idFuente"
                confirmDelete={confirmDelete} 
                entidad='Fuente' 
                accion='eliminar'
            />

            <FormModalEdit 
                isOpen={isModalOpenEdit} 
                onRequestClose={closeModalEdit} 
                fields={[
                    { name: 'idFuente', label: 'ID Fuente', type: 'number', readOnly: true },
                    { name: 'nombre', label: 'Fuente', type: 'text' },
                ]}
                formValues={formValues}
                handleChange={handleFieldChange}
                handleSubmit={handleFormSubmit}
                initialValues={selectedEdit}
                entidad='Fuente'
            />

        </div>
    );
}

export default FuenteIngreso;