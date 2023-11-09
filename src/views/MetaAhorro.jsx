import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMetas, eliminarMeta, editarMeta, crearMeta } from '../redux/metaahorroSlice';
import ModalDelete from "../components/modal/Modal";
import FormModalEdit from "../components/formEdit/FormEdit";
import TableData from "../components/table/Table";
import {  Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, } from "@nextui-org/react";
import DynamicForm from "../components/DynamicForm/DynamicForm";


const MetaAhorro = () => {

    const dispatch = useDispatch();
    const metaState = useSelector((state) => state.metas);
    

    // ESTADOS
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [selectedDelete, setSelectedDelete] = useState(null);

    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [selectedEdit, setSelectedEdit] = useState(null);

    const [formValues, setFormValues] = useState({
        idMeta: '',
        nombre: ''
    });

    useEffect(() => {
        dispatch(fetchMetas());
    }, [metaState.metas]);


    // HANDLES
    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(editarMeta(formValues));
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
        dispatch(eliminarMeta(id));
        closeModalDelete();
    };


    
 
     // Guardar Rol
     const handleSave = (data, onClose) => {
        dispatch(crearMeta(data));
        onClose();
     };

     const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
        <div>
            <h1 className="my-5 text-center text-2xl">Metas de Ahorro</h1>
            <Button className="ml-10 my-5" color="success" onPress={onOpen}>Agregar Meta</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <DynamicForm
                                    formData={[
                                        { name: 'nombre', label: 'Meta', type: 'text', defaultValue: '' },
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
                data={metaState.metas}
                idField="idMeta"
                onEdit={showModalEdit}
                onDelete={showModalDelete}
            />

            <ModalDelete
                isOpen={isModalOpenDelete} 
                onRequestClose={closeModalDelete} 
                entity={selectedDelete} 
                idField="idMeta"
                confirmDelete={confirmDelete} 
                entidad='Meta' 
                accion='eliminar'
            />

            <FormModalEdit 
                isOpen={isModalOpenEdit} 
                onRequestClose={closeModalEdit} 
                fields={[
                    { name: 'idMeta', label: 'ID Meta', type: 'number', readOnly: true },
                    { name: 'nombre', label: 'Meta', type: 'text' },
                ]}
                formValues={formValues}
                handleChange={handleFieldChange}
                handleSubmit={handleFormSubmit}
                initialValues={selectedEdit}
                entidad='Meta'
            />

        </div>
    );
}

export default MetaAhorro;
