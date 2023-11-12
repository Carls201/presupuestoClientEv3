import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriaGasto, eliminarCategoriaGasto, editarCategoriaGasto, crearCategoriaGasto } from '../redux/categoriaGastoSlice';
import ModalDelete from "../components/modal/Modal";
import FormModalEdit from "../components/formEdit/FormEdit";
import TableData from "../components/table/Table";
import {  Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, } from "@nextui-org/react";
import DynamicForm from "../components/DynamicForm/DynamicForm";


const CategoriaGasto = () => {

    const dispatch = useDispatch();
    const categoriaState = useSelector((state) => state.categorias);
    

    // ESTADOS
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [selectedDelete, setSelectedDelete] = useState(null);

    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [selectedEdit, setSelectedEdit] = useState(null);

    const [formValues, setFormValues] = useState({
        idCategoria: '',
        nombre: ''
    });

    useEffect(() => {
        dispatch(fetchCategoriaGasto());
    }, [categoriaState.categorias]);


    // HANDLES
    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(editarCategoriaGasto(formValues));
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
        dispatch(eliminarCategoriaGasto(id));
        closeModalDelete();
    };


    
 
     // Guardar Rol
    const handleSave = (data, onClose) => {
        dispatch(crearCategoriaGasto(data));
        onClose();
    };

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <div>
            <h1 className="my-5 text-center text-2xl">Categoria de Gastos</h1>
            <Button className="ml-10 my-5" color="success" onPress={onOpen}>Agregar Categoria</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <DynamicForm
                                    formData={[
                                        { name: 'nombre', label: 'Categoria', type: 'text', defaultValue: '' },
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
                data={categoriaState.categorias}
                idField="idCategoria"
                onEdit={showModalEdit}
                onDelete={showModalDelete}
            />

            <ModalDelete
                isOpen={isModalOpenDelete} 
                onRequestClose={closeModalDelete} 
                entity={selectedDelete} 
                idField="idCategoria"
                confirmDelete={confirmDelete} 
                entidad='Categoria' 
                accion='eliminar'
            />

            <FormModalEdit 
                isOpen={isModalOpenEdit} 
                onRequestClose={closeModalEdit} 
                fields={[
                    { name: 'idCategoria', label: 'ID Categoria', type: 'number', readOnly: true },
                    { name: 'nombre', label: 'Categoria', type: 'text' },
                ]}
                formValues={formValues}
                handleChange={handleFieldChange}
                handleSubmit={handleFormSubmit}
                initialValues={selectedEdit}
                entidad='Categoria'
            />

        </div>
    );
}

export default CategoriaGasto;