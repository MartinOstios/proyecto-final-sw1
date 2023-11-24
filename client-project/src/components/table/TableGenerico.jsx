import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import UpdateIcon from '@mui/icons-material/Update';
import ModalGenerico from '../modal/ModalGenerico';

export default function TableGenerica({ columnas, datos, handleOpenUpdate, handleOpenSearch, handleDelete }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columnas.map((columna) => (
                            <TableCell>{columna}</TableCell>
                        ))}
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {datos.map((dato) => (
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {Object.values(dato).map((propiedad) => (
                                <TableCell align="left">{propiedad}</TableCell>
                            ))}
                            <TableCell align="left">
                                <IconButton aria-label="search" onClick={() => handleOpenSearch(true, dato._id)}>
                                    <SearchIcon />
                                </IconButton>
                                <IconButton aria-label="update" onClick={() => handleOpenUpdate(true, dato._id)}>
                                    <UpdateIcon />
                                </IconButton>
                                <IconButton aria-label="delete" onClick={() => handleDelete(dato._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}