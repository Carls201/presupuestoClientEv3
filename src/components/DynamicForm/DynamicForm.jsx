import React, { useState } from 'react';
import {Input, Button} from "@nextui-org/react";

const DynamicForm = ({ formData, handleSave, onClose }) => {

    const [formValues, setFormValues] = useState(
        formData.reduce((values, field) => ({ ...values, [field.name]: field.defaultValue || '' }), {})
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    
    return (
        <form>
            {formData.map(field => (
                <div key={field.name}>
                    <Input
                        className='my-5'
                        label={field.name}
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formValues[field.name]}
                        onChange={handleChange}
                        readOnly={field.readOnly}
                        // Agrega aquí cualquier otra propiedad que necesites
                    />
                </div>
            ))}
            
            <Button color='warning' className='mb-5' onClick={ () => handleSave(formValues, onClose)}>Guardar</Button>
        </form>
    );
};

export default DynamicForm;