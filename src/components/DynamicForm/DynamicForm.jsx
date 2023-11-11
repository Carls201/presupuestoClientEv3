import React, { useState } from 'react';
import {Input, Button, Select, SelectItem} from "@nextui-org/react";

const DynamicForm = ({ formData, handleSave, onClose }) => {

    const [formValues, setFormValues] = useState(
        formData.reduce((values, field) => ({ ...values, [field.name]: field.defaultValue || '' }), {})
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    let a = 0;
    
    return (
        <form>
            {formData.map(field => {
                

                if(field.type === 'select'){
                    return (
                        <Select
                            label={field.label}
                            placeholder={`Selecciona ${field.name}`}
                            name={field.name}
                            className='max-w-xs'
                            onChange={handleChange}
                        >
                            {field.options.map(option => (
                                <SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>
                            ))}
                        </Select>
                    );
                } else {
                    return (

                        <Input
                            className='my-5'
                            key={a++}
                            label={field.name}
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            value={formValues[field.name]}
                            onChange={handleChange}
                            readOnly={field.readOnly}
                        />
                    );
                }
            
            }
            )}
            
            <Button color='warning' className='mb-5' onClick={ () => handleSave(formValues, onClose)}>Guardar</Button>
        </form>
    );
};

export default DynamicForm;