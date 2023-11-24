import React, { useState } from 'react'
import Modal from '../../../components/modal/ModalGenerico'
import { Button, Typography } from '@mui/material'
import TableGenerica from '../../../components/table/TableGenerico'
import ModalGenerico from '../../../components/modal/ModalGenerico'
let data = [
  {
    "_id": "655fac5cc150bc413bd44373",
    "name": "Martín",
    "email": "martin.ostiosa@autonoma.edu.co",
    "password": "hola123"
  },
  {
    "_id": "656019b8c0a4f00b7da9af87",
    "name": "Julián",
    "email": "juliana.velozac@autonoma.edu.co",
    "password": "hola123"
  }
]


const User = () => {

  const [openUpdate, setOpenUpdate] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const [selectedData, setSelectedData] = useState(null);
  const [createUser, setCreateUser] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    avatar: '',
    role: ''
  });

  const handleOpenUpdate = async (state, dataId) => {
    setOpenUpdate(state);
    console.log(dataId);
  }

  const handleOpenSearch = async (state, dataId) => {
    setOpenSearch(state);
    console.log(dataId);
  }

  const handleOpenCreate = async (state) => {
    setOpenCreate(state);
  }

  const handleDelete = async (dataId) => {
    console.log('Click en eliminar', dataId)
  }


  return (
    <div>
      <h1>Usuarios</h1>
      <Button variant='contained' color='primary' onClick={() => handleOpenCreate(true)}>Crear usuario</Button>
      <TableGenerica
        columnas={['id', 'nombre', 'email', 'password']}
        datos={data}
        handleOpenSearch={handleOpenSearch}
        handleOpenUpdate={handleOpenUpdate}
        handleDelete={handleDelete}
      />

      <ModalGenerico open={openCreate} handleOpen={handleOpenCreate}>
        <h1>Crear</h1>
      </ModalGenerico>

      <ModalGenerico open={openUpdate} handleOpen={handleOpenUpdate}>
        <h1>Actualizar</h1>
      </ModalGenerico>

      <ModalGenerico open={openSearch} handleOpen={handleOpenSearch}>
        <h1>Mostrar</h1>
      </ModalGenerico>
    </div>
  )
}

export default User