import React, { useState, useRef } from 'react'
import Modal from '../../../components/modal/ModalGenerico'
import { Button, Typography } from '@mui/material'
import TableGenerica from '../../../components/table/TableGenerico'
import ModalGenerico from '../../../components/modal/ModalGenerico'
import { Grid, TextField, Checkbox } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { useSelector, useDispatch } from 'react-redux'
import { addUsers, editUsers } from '../../../features/user/userSlice'
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
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [idUser, setIdUser] = useState(null);
  const [userEdit, setUserEdit] = useState({
    name: '',
    lastname: '',
    email: '',
    avatar: null,
    role: '',
  });
  const fileInputRef = useRef();
  const fileInputRefEdit = useRef();
  const [createUser, setCreateUser] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    avatar: null,
    role: '',
  });


  const handleOpenUpdate = async (state, dataId) => {
    setOpenUpdate(state);
    setIdUser(dataId)
    setUserEdit({ name: dataId.name, lastname: dataId.lastname, email: dataId.email, avatar: dataId.avatar, rol: dataId.role })
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

  const handleCreateUser = async () => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(createUser)) {
      formData.append(key, value);
    }
    users.createUser(createUser)
  }

  const handleInputChange = (e) => {
    dispatch(addUsers(e.target.value))
  };

  const handleInputChangeEdit = (e) => {
    dispatch(editUsers(e.target.value))
  };

  const handleFileChange = () => {
    const file = fileInputRef.current.files[0];
    console.log('Archivo seleccionado:', file);
    createUser.avatar = file;
  };

  const handleFileChangeEdit = () => {
    const file = fileInputRefEdit.current.files[0];
    console.log('Archivo seleccionado:', file);
    userEdit.avatar = file;
  };

  return (
    <div>
      <h1>Usuarios</h1>
      <Button variant='contained' color='primary' onClick={() => handleOpenCreate(true)} style={{ margin: "2px 2px 10px 2px"}}>Crear usuario</Button>
      <Button variant='contained' color='primary' onClick={() => handleOpenUpdate(true)} style={{ margin: "2px 2px 10px 2px"}}>Editar usuario</Button>
      <TableGenerica
        columnas={['id', 'nombre', 'email', 'password']}
        datos={ data /* [users.id, users.name, users.email, users.password] */}
        handleOpenSearch={handleOpenSearch}
        handleOpenUpdate={handleOpenUpdate}
        handleDelete={handleDelete}
      />
      {/* Modal crear Usuario */}
      <ModalGenerico open={openCreate} handleOpen={handleOpenCreate}>
        <h1 style={{ marginBottom: "40px" }}>Crear Usuario </h1>
        <form>
          <div >
            <div>
              <Grid container spacing={2} display={'flex'}>
                <Grid item xs={6} >
                  <TextField type='text' label="Nombres" variant="outlined" value={users.name} name='firstname' onChange={handleInputChange} />
                </Grid>
                <Grid item xs={6}>
                  <TextField type='text' label="Apellidos" variant="outlined" value={createUser.lastname} name='lastname' onChange={handleInputChange} />
                </Grid>
                <Grid item xs={6}>
                  <TextField type='text' label="Email" variant="outlined" value={createUser.email} name='email' onChange={handleInputChange} />
                </Grid>
                <Grid item xs={6}>
                  <TextField type='password' label="Contraseña" variant="outlined" value={createUser.password} name='password' onChange={handleInputChange} />
                </Grid>
                <Grid item xs={6}>
                  <TextField type='text' label="Dirección" variant="outlined" /* value={createUser.address} */ name='address' onChange={handleInputChange} />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={['rol 1', 'rol 2', 'rol 3']}
                    renderInput={(params) => <TextField {...params} label="Rol" />}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <input type="file" ref={fileInputRef} style={{ display: 'none', marginTop: '10px' }} onChange={handleFileChange} id="fileInput" />
                  <label htmlFor="fileInput">
                    <Button variant="contained" component="span">Imagen</Button>
                  </label>
                </Grid>
              </Grid>
            </div>
          </div>
          <div style={{ marginTop: '25px', marginLeft: "150px" }}>
            <Button type='submit' variant="contained" color="primary" onClick={handleCreateUser}>
              {/* FALTA forma de llevar estos datos a createUser en api */}
              Crear usuario
            </Button>
          </div>
        </form>
      </ModalGenerico>

      {/* Modal Editar Usuario */}
      <ModalGenerico open={openUpdate} handleOpen={handleOpenUpdate}>
        <h1 style={{ marginBottom: "40px" }}>Actualizar Usuario </h1>
        <form>
          <div >
            <div>
              <Grid container spacing={2} display={'flex'}>
                <Grid item xs={6} >
                  <TextField type='text' label="Nombres" variant="outlined" value={userEdit.name} name='firstname' onChange={handleInputChangeEdit} />
                </Grid>
                <Grid item xs={6}>
                  <TextField type='text' label="Apellidos" variant="outlined" value={userEdit.lastname} name='lastname' onChange={handleInputChangeEdit} />
                </Grid>
                <Grid item xs={6}>
                  <TextField type='text' label="Email" variant="outlined" value={userEdit.email} name='email' onChange={handleInputChangeEdit} />
                </Grid>
                <Grid item xs={6}>
                  <TextField type='text' label="Dirección" variant="outlined" /* value={userEdit.address} */ name='address' onChange={handleInputChangeEdit} />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={['rol 1', 'rol 2', 'rol 3']}
                    renderInput={(params) => <TextField {...params} label="Rol" />}
                    onChange={handleInputChangeEdit}
                  />
                </Grid>
                <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <input type="file" ref={fileInputRef} style={{ display: 'none', marginTop: '10px' }} onChange={handleFileChangeEdit} id="fileInput" />
                  <label htmlFor="fileInput">
                    <Button variant="contained" component="span">Imagen</Button>
                  </label>
                </Grid>
              </Grid>
            </div>
          </div>
          <div style={{ marginTop: '25px', marginLeft: "150px" }}>
            <Button type='submit' variant="contained" color="primary" /* onClick={editUser} */>
              {/* FALTA forma de llevar estos datos a createUser en api */}
              Actualizar usuario
            </Button>
          </div>
        </form>
      </ModalGenerico>

      {/* Modal Mostrar Usuario */}
      <ModalGenerico open={openSearch} handleOpen={handleOpenSearch}>
        <h1 style={{ marginBottom: "40px" }}>Mostrar Usuario </h1>
        <Grid item xs={5} md={5}>
          {/* <img src={selectedUser?.avatar} alt={selectedUser?.name} style={{ width: "100%", borderRadius: "10px", margin: "0" }}></img> */}
          <h3>avatar</h3>
        </Grid>
        <Grid item xs={7} md={7}>
            <Typography id="userName" variant="h6" component="h2">
              {/* {selectedUser?.name} */}
              <h3>Nombre</h3>
            </Typography>
            <Typography id="userLastname" variant="h6" component="h2">
              {/* {selectedUser?.lastname} */}
              <h3>Apellido</h3>
            </Typography>
            <Typography id="userAddress" variant="h6" component="h2">
              {/* {selectedUser?.address} */}
              <h3>Dirección</h3>
            </Typography>
            <Typography id="userRole" variant="h6" component="h2">
              {/* {selectedUser?.role} */}
              <h3>Rol</h3>
            </Typography>
        </Grid>
      </ModalGenerico>
    </div>
  )
}

export default User