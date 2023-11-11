import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, ModalHeader, ModalBody, Button, useDisclosure, ModalContent } from "@nextui-org/react";
import { resetErrorState } from '../redux/rolSlice'; // Asegúrate de importar la acción correcta

const ErrorModal = () => {
    const error = useSelector((state) => state.roles.error);
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (error) {
            onOpen();
        }
    }, [error, onOpen]);

    const handleClose = () => {
        onClose();
        dispatch(resetErrorState()); // Resetear el estado del error al cerrar el modal
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalContent>

                <ModalHeader>Error</ModalHeader>
                <ModalBody>
                    <p>{error?.message || 'No hay mensaje de error'}</p>

                    <Button auto onClick={handleClose} color="error">
                        Cerrar
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ErrorModal;
