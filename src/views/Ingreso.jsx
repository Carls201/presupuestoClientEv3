import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngreso, eliminarIngreso, editarIngreso, crearIngreso } from '../redux/ingresoSlice';
import ModalDelete from "../components/modal/Modal";
import FormModalEdit from "../components/formEdit/FormEdit";
import TableData from "../components/table/Table";
import {  Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import DynamicForm from "../components/DynamicForm/DynamicForm";
import { fetchFuentes } from "../redux/fuenteSlice";
import { meIdUsuario } from "../redux/usuariosSlice";



const Ingreso = () => {

    const dispatch = useDispatch();
    const ingresoState = useSelector((state) => state.ingresos);
    const usuarioState = useSelector(state => state.usuarios);
    const fuenteState = useSelector(state => state.fuentes);

    // ESTADOS
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [selectedDelete, setSelectedDelete] = useState(null);

    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [selectedEdit, setSelectedEdit] = useState(null);
    
    const [formValues, setFormValues] = useState({
        idIngreso: '',
        idUsuario: '',
        idFuente: '',
        monto: ''
    });

    useEffect(() => {
        dispatch(fetchIngreso());
    }, [dispatch]);

    useEffect(() => { dispatch(fetchFuentes()) }, [dispatch]);
    useEffect(() => { dispatch(meIdUsuario()) }, [dispatch]);


    

    // HANDLES
    const handleFieldChange = (e) => {
        const { name, value } = e.target;

        if (name === 'IdFuente') {
         
            const fuenteSelected = fuenteOptions.find(option => option.id.toString() === value);

            setFormValues(prev => ({
              ...prev,
              IdFuente: parseInt(value, 10),
              fuente: fuenteSelected ? fuenteSelected.label: ''
            }));
          } else {
            
            setFormValues(prev => ({ ...prev, [name]: value }));
          }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(editarIngreso(formValues));
        closeModalEdit();
    };

    // FUNCIONES

    // EDITAR
    const showModalEdit = (data) => {
        console.log(data);
        const fuenteId = fuenteOptions.find(fuente => fuente.label === data.fuente)?.id;

        const initialValues ={
            idIngreso: data.idIngreso,
            idUsuario: data.idUsuario,
            IdFuente: fuenteId || '',
            monto: data.monto
        }
        
        setFormValues(initialValues);
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
        dispatch(eliminarIngreso(id));
        closeModalDelete();
    };

 
     // Guardar Ahorro
    const handleSave = (data, onClose) => {
        const newData = {...data, idUsuario: usuarioState.id}
        dispatch(crearIngreso(newData));
        onClose();
    };

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const fuenteOptions = fuenteState.fuentes && Array.isArray(fuenteState.fuentes)?
    fuenteState.fuentes.map(fuente => ({
        id: fuente.idFuente,
        label: fuente.nombre
    }))
   : [];
    

    
    return (
        <div>
            <h1 className="my-5 text-center text-2xl">Ingresos</h1>
            <Button className="ml-10 my-5" color="success" onPress={onOpen}>Agregar Ingresos</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <DynamicForm
                                    formData={[
                                        
                                        { name: 'IdFuente', label: 'Fuente', type: 'select', options: fuenteOptions },
                                        { name: 'monto', label: 'Monto', type: 'number', defaultValue: '' },
                                    ]}

                                    handleSave={data => handleSave(data, onClose)}
                                    onClose={onClose}
                                />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <TableData
                data={ingresoState.ingresos}
                idField="idIngreso"
                onEdit={showModalEdit}
                onDelete={showModalDelete}
            />

            <ModalDelete
                isOpen={isModalOpenDelete} 
                onRequestClose={closeModalDelete} 
                entity={selectedDelete} 
                idField="idIngreso"
                confirmDelete={confirmDelete} 
                entidad='Ingreso' 
                accion='eliminar'
            />

            <FormModalEdit 
                isOpen={isModalOpenEdit} 
                onRequestClose={closeModalEdit} 
                fields={[
                    { name: 'idIngreso', label: 'ID Ingreso', type: 'number', readOnly: true },
                    { name: 'IdFuente', label: 'Fuente', type: 'select', options: fuenteOptions },
                    { name: 'monto', label: 'Monto', type: 'number' },
                ]}
                formValues={formValues}
                handleChange={handleFieldChange}
                handleSubmit={handleFormSubmit}
                initialValues={selectedEdit}
                entidad='Ingreso'
            />

        </div>
    );
}

export default Ingreso;