import React, { useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Button, useDisclosure, ModalContent } from "@nextui-org/react";
import { resetErrorState } from '../redux/rolSlice'; 

const ErrorLogin = ({error}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (error) {
            onOpen();
        }
    }, [error, onOpen]);

    const handleClose = () => {
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalContent>

                <ModalHeader>Error</ModalHeader>
                <ModalBody>
                    <p>{error}</p>

                    <Button auto onClick={handleClose} color="error">
                        Cerrar
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ErrorLogin;