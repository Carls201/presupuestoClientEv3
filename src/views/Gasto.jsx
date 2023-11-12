import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGasto, eliminarGasto, editarGasto, crearGasto } from '../redux/gastoSlice';
import ModalDelete from "../components/modal/Modal";
import FormModalEdit from "../components/formEdit/FormEdit";
import TableData from "../components/table/Table";
import {  Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import DynamicForm from "../components/DynamicForm/DynamicForm";
import { fetchCategoriaGasto } from "../redux/categoriaGastoSlice";
import { meIdUsuario } from "../redux/usuariosSlice";



const Gasto = () => {

    const dispatch = useDispatch();
    const gastoState = useSelector((state) => state.gastos);
    const usuarioState = useSelector(state => state.usuarios);
    const categoriaState = useSelector(state => state.categorias);

    // ESTADOS
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [selectedDelete, setSelectedDelete] = useState(null);

    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [selectedEdit, setSelectedEdit] = useState(null);

    const [formValues, setFormValues] = useState({
        idGasto: '',
        idUsuario: '',
        idCategoria: '',
        monto: ''
    });

    useEffect(() => {
        dispatch(fetchGasto());
    }, [gastoState.gastos]);


    useEffect(() => { dispatch(fetchGasto()) }, []);
    useEffect(() => { dispatch(meIdUsuario()) }, []);
    useEffect(() => { dispatch(fetchCategoriaGasto()) }, []);
    useEffect(() => { dispatch(fetchCategoriaGasto()) }, [categoriaState]);

    // HANDLES
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

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(editarGasto(formValues));
        closeModalEdit();
    };

    // FUNCIONES

    // EDITAR
    const showModalEdit = (data) => {
        const {nombre, ...dataN } = data;
        setFormValues({...dataN});
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
        dispatch(eliminarGasto(id));
        closeModalDelete();
    };

 
     // Guardar Ahorro
    const handleSave = (data, onClose) => {
        const newData = {...data, idUsuario: usuarioState.id}
        dispatch(crearGasto(newData));
        onClose();
    };

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const categoriaOptions = categoriaState.categorias && Array.isArray(categoriaState.categorias)?
    categoriaState.categorias.map(categoria => ({
        id: categoria.idCategoria,
        label: categoria.nombre
    }))
   : [];
    

    
    return (
        <div>
            <h1 className="my-5 text-center text-2xl">Gastos</h1>
            <Button className="ml-10 my-5" color="success" onPress={onOpen}>Agregar Gastos</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <DynamicForm
                                    formData={[
                                        
                                        { name: 'idCategoria', label: 'Categoria', type: 'select', options: categoriaOptions },
                                        { name: 'monto', label: 'Monto', type: 'number', defaultValue: '' },
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
                data={gastoState.gastos}
                idField="idGasto"
                onEdit={showModalEdit}
                onDelete={showModalDelete}
            />

            <ModalDelete
                isOpen={isModalOpenDelete} 
                onRequestClose={closeModalDelete} 
                entity={selectedDelete} 
                idField="idGasto"
                confirmDelete={confirmDelete} 
                entidad='idGasto' 
                accion='eliminar'
            />

            <FormModalEdit 
                isOpen={isModalOpenEdit} 
                onRequestClose={closeModalEdit} 
                fields={[
                    { name: 'idGasto', label: 'ID Gasto', type: 'number', readOnly: true },
                    { name: 'idCategoria', label: 'Categoria', type: 'select', options: categoriaOptions },
                    { name: 'monto', label: 'Monto', type: 'number' },
                ]}
                formValues={formValues}
                handleChange={handleFieldChange}
                handleSubmit={handleFormSubmit}
                initialValues={selectedEdit}
                entidad='Gasto'
            />

        </div>
    );
}

export default Gasto;