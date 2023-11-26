import React from 'react';
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



export default function TableGenerica({ columnasData, columnasTabla, datos, handleOpenUpdate, handleOpenSearch, handleDelete }) {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columnasTabla.map((columna) => (
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
                            {Object.entries(dato).map((llave) => (
                                columnasData.includes(llave[0]) &&
                                <TableCell align="left">{llave[1]}</TableCell>

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