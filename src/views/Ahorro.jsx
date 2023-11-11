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
    }, [ahorroState.ahorros]);


    useEffect(() => { dispatch(fetchMetas()) }, []);
    useEffect(() => { dispatch(meIdUsuario()) }, []);
    useEffect(() => { dispatch(fetchMetas()) }, []);
    useEffect(() => { dispatch(fetchMetas()) }, [metaState]);

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
        dispatch(editarAhorro(formValues));
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
                                        
                                        { name: 'IdMeta', label: 'Meta', type: 'select', options: metaState.metas.map(meta => ({
                                            id: meta.idMeta,
                                            label: meta.nombre
                                        }) ) 
                                    },
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
                    { name: 'IdMeta', label: 'Meta', type: 'select', options: metaState.metas.map(meta => ({
                        id: meta.idMeta,
                        label: meta.nombre
                    }) ) 
                },
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