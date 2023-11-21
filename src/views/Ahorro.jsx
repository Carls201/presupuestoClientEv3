import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAhorro, eliminarAhorro, editarAhorro, crearAhorro } from '../redux/ahorroSlice';
import ModalDelete from "../components/modal/Modal";
import FormModalEdit from "../components/formEdit/FormEdit";
import TableData from "../components/table/Table";
import {  Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import DynamicForm from "../components/DynamicForm/DynamicForm";
import { fetchMetas } from "../redux/metaahorroSlice";
import { meIdUsuario } from "../redux/usuariosSlice";



const Ahorro = () => {

    const dispatch = useDispatch();
    const ahorroState = useSelector((state) => state.ahorros);
    const usuarioState = useSelector(state => state.usuarios);
    const metaState = useSelector(state => state.metas);

    // ESTADOS
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [selectedDelete, setSelectedDelete] = useState(null);

    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [selectedEdit, setSelectedEdit] = useState(null);

    const [formValues, setFormValues] = useState({
        idAhorro: '',
        idUsuario: '',
        idMeta: '',
        monto: ''
    });

    useEffect(() => {
        dispatch(fetchAhorro());
    }, [dispatch]);


    useEffect(() => { dispatch(fetchMetas()) }, [dispatch]);
    useEffect(() => { dispatch(meIdUsuario()) }, [dispatch]);

    // HANDLES

    
    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        if (name === 'IdMeta') {
            // Encuentra el objeto de la meta correspondiente al ID seleccionado
            const metaSelected = metaOptions.find(option => option.id.toString() === value);
    
            setFormValues(prev => ({
                ...prev,
                IdMeta: parseInt(value, 10), // Actualiza el ID de la meta
                meta: metaSelected ? metaSelected.label : '' // Actualiza el nombre de la meta para mostrar en el UI
            }));
        } else {
            setFormValues(prev => ({ ...prev, [name]: value }));
        }
    };
    

    const handleFormSubmit = () => {
        dispatch(editarAhorro(formValues));
        closeModalEdit();
    };

    // FUNCIONES

    // EDITAR
    
    const showModalEdit = (data) => {
        // Calcula el valor inicial para el campo 'select' basado en la configuración de las opciones
        const metaId = metaOptions.find(meta => meta.label === data.meta)?.id;
    
        const initialValues = {
            idAhorro: data.idAhorro,
            idUsuario: data.idUsuario,
            IdMeta: metaId || '', // El valor inicial para el campo 'select'
            monto: data.monto
        };
    
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
        dispatch(eliminarAhorro(id));
        closeModalDelete();
    };

 
     // Guardar Ahorro
    const handleSave = (data, onClose) => {
        const newData = {...data, idUsuario: usuarioState.id}
        dispatch(crearAhorro(newData));
        onClose();
    };

    const {isOpen, onOpen, onOpenChange} = useDisclosure();


    const metaOptions = metaState.metas && Array.isArray(metaState.metas)
        ? metaState.metas.map(meta => ({
            id: meta.idMeta,
            label: meta.nombre
          }))
        : [];

    
   
    
    
    return (
        <div>
            <h1 className="my-5 text-center text-2xl">Ahorros</h1>
            <Button className="ml-10 my-5" color="success" onPress={onOpen}>Agregar Ahorro</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <DynamicForm
                                    formData={[
                                        
                                        { name: 'IdMeta', label: 'Meta', type: 'select', options: metaOptions
                                            
                                         
                                    },
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
                data={ahorroState.ahorros}
                idField="idAhorro"
                onEdit={showModalEdit}
                onDelete={showModalDelete}
            />

            <ModalDelete
                isOpen={isModalOpenDelete} 
                onRequestClose={closeModalDelete} 
                entity={selectedDelete} 
                idField="idAhorro"
                confirmDelete={confirmDelete} 
                entidad='Ahorro' 
                accion='eliminar'
            />

            <FormModalEdit 
                isOpen={isModalOpenEdit} 
                onRequestClose={closeModalEdit} 
                fields={[
                    { name: 'idAhorro', label: 'ID Ahorro', type: 'number', readOnly: true },
                    { name: 'IdMeta', label: 'Meta', type: 'select', options: metaOptions },
                    { name: 'monto', label: 'Monto', type: 'number' },
                ]}
                formValues={formValues}
                handleChange={handleFieldChange}
                handleSubmit={handleFormSubmit}
                initialValues={selectedEdit}
                entidad='Ahorro'
            />

        </div>
    );
}

export default Ahorro;