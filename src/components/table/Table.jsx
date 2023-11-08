import React from 'react';
import { Button,  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/react";

const TableData = ({ data, idField, onEdit, onDelete }) => {
    if (!data || data.length === 0) {
        return <p>No hay datos para mostrar.</p>;
    }

    const tableHeaders = Object.keys(data[0]);

    return (

        <div className='px-10'>
            <Table aria-label="Example static collection table">
                <TableHeader>
                    {
                        tableHeaders.map((header) => (
                            <TableColumn className='text-center text-base text-rose-500'>{header}</TableColumn>
                        ))
                    }
                    <TableColumn className='text-center text-base text-rose-500'>Acciones</TableColumn>
                </TableHeader>
                <TableBody>
                    {data.map((item) => (
                        <TableRow>
                            {Object.values(item).map((value) => (
                                <TableCell className='text-center'>{value}</TableCell>
                            ))}
                            <TableCell className='text-center'>
                                
                                <Button className='m-4' color='danger' onClick={() => onDelete(item)}>Eliminar</Button>
                                <Button color='warning' onClick={() => onEdit(item)}>Editar</Button>
                                
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        
    );

};

export default TableData;
