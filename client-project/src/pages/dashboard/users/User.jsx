import React, { useEffect, useState } from 'react'
import { Button, InputLabel, Typography, Grid, TextField, Select, MenuItem, FormControl, Backdrop, CircularProgress } from '@mui/material'
import TableGenerica from '../../../components/table/TableGenerico'
import ModalGenerico from '../../../components/modal/ModalGenerico'

import { useDispatch } from 'react-redux'
import { setUsers, addUsers} from '../../../features/user/userSlice'

import { Users } from '../../../api/user';
import { Role } from '../../../api/role';


import { useSnackbar } from 'notistack'


const User = () => {
  const { enqueueSnackbar } = useSnackbar();


  const userApi = new Users();
  const roleApi = new Role();

  const dispatch = useDispatch();
  const [dataList, setDataList] = useState([]);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [formInfo, setFormInfo] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    avatar: null,
    role: '',
  });


  // ---- INICIO MODALES

  const handleOpenUpdate = async (state, dataId) => {
    setOpenUpdate(state);
    const data = findDataById(dataId);
    setSelectedData(data);
  }

  const handleOpenSearch = async (state, dataId) => {
    setOpenSearch(state);
    const data = findDataById(dataId);
    setSelectedData(data);
  }

  const handleOpenCreate = async (state) => {
    setOpenCreate(state);
  }

  const handleDelete = async (dataId) => {
    setOpenBackdrop(true);
    const data = findDataById(dataId);
    const res = await userApi.deleteUser(data.email);

    if (res.status === 200) {
      enqueueSnackbar(res.message, { variant: 'success' });
      getData();
    } else {
      enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
    }
    setOpenBackdrop(false);
  }

  const findDataById = (dataId) => {
    return dataList.find((data) => data._id === dataId);
  }

  // ---------- FIN MODALES


  // ---------- INICIO HANDLE CHANGES
  const handleInputChange = (event) => {
    if (event.target.name === 'avatar') {
      const file = event.target.files ? event.target.files[0] : null;
      setFormInfo((formInfo) => ({ ...formInfo, [event.target.name]: file }));
    } else {
      setFormInfo((formInfo) => ({ ...formInfo, [event.target.name]: event.target.value }));
    }
  }

  // ---------- FIN HANDLE CHANGES


  // ---------- INICIO HANDLE SUBMIT

  const handleSubmit = async (form) => {
    setOpenBackdrop(true);
    // Pasar información a FormData (porque hay imágenes)
    const formData = new FormData();
    for (const [key, value] of Object.entries(formInfo)) {
      if (value !== "" && value) {
        formData.append(key, value);
      }
    }

    if (form === 'create') {
      await handleCreate(formData)
    }

    if (form === 'edit') {
      await handleEdit(formData);
    }

    setOpenBackdrop(false);
  }

  const handleCreate = async (formData) => {
    // Llamar API
    setOpenCreate(false);
    const res = await userApi.createUser(formData);
    // Llamar al Store
    if (res.status === 200) {
      dispatch(addUsers(res));
      enqueueSnackbar(res.message, { variant: 'success' });
      await getData();
    } else {
      enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
    }
  }

  const handleEdit = async (formData) => {
    // Llamar a la API
    setOpenUpdate(false);
    const res = await userApi.updateUser(selectedData.email, formData);
    console.log(res)

    // Llamar al Store
    if (res.status === 200) {
      enqueueSnackbar(res.message, { variant: 'success' });
      await getData();
    } else {
      enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
    }
  }

  // ---------- FIN HANDLE SUBMIT


  // ---------- EXTRAS
  const [roles, setRoles] = useState([]);

  // ----------- FIN EXTRAS


  // ---- CARGAR INFO USUARIOS AL CARGAR PÁGINA
  useEffect(() => {
    getData();
    getRoles();
  }, [setDataList, setRoles]);

  const getData = async () => {
    setOpenBackdrop(true);
    const data = await userApi.showUsers();
    if (data) {
      dispatch(setUsers(data));
      setDataList(data);
    }
    setOpenBackdrop(false);
  };

  const getRoles = async () => {
    const data = await roleApi.showRoles();
    if (data) {
      setRoles(data);
    }
  }

  return (
    <div>
      <h1>Usuarios</h1>
      <Button variant='contained' color='primary' onClick={() => handleOpenCreate(true)} style={{ margin: "2px 2px 10px 2px" }}>Crear usuario</Button>
      <TableGenerica
        columnasData={['_id', 'name', 'email', 'password']}
        columnasTabla={['ID', 'Nombre', 'Email', 'Contraseña']}
        datos={dataList}
        handleOpenSearch={handleOpenSearch}
        handleOpenUpdate={handleOpenUpdate}
        handleDelete={handleDelete}
      />

      <ModalGenerico open={openCreate} handleOpen={handleOpenCreate}>
        <h1 style={{ marginBottom: "40px" }}>Crear usuario </h1>
        <form>
          <Grid container spacing={2} display={'flex'}>
            <Grid item xs={6} >
              <TextField type='text' label="Nombres" variant="outlined" name='name' onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField type='text' label="Apellidos" variant="outlined" name='lastname' onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField type='text' label="Email" variant="outlined" name='email' onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField type='password' label="Contraseña" variant="outlined" name='password' onChange={handleInputChange} />
            </Grid>
            {/*  <Grid item xs={6}>
              <TextField type='text' label="Dirección" variant="outlined" name='address' onChange={handleInputChange} />
            </Grid> */}
            <Grid item xs={6}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="demo-simple-select-label-2">Rol</InputLabel>
                <Select
                  label="Rol"
                  variant="outlined"
                  name="role"
                  value={formInfo.role}
                  onChange={handleInputChange}
                >
                  {roles.map((role) => (
                    <MenuItem key={role._id} value={role._id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <input type="file" style={{ display: 'none', marginTop: '10px' }} name='avatar' onChange={handleInputChange} id="fileInput" />
              <label htmlFor="fileInput">
                <Button variant="contained" component="span">Imagen</Button>
              </label>
            </Grid>
          </Grid>
          <div style={{ marginTop: '25px', marginLeft: "150px" }}>
            <Button variant="contained" color="primary" onClick={() => handleSubmit('create')}>
              Crear usuario
            </Button>
          </div>
        </form>
      </ModalGenerico>

      <ModalGenerico open={openUpdate} handleOpen={handleOpenUpdate}>
        <h1 style={{ marginBottom: "40px" }}>Actualizar usuario</h1>
        <form>
          <Grid container spacing={2} display={'flex'}>
            <Grid item xs={6} >
              <TextField type='text' label="Nombres" variant="outlined" defaultValue={selectedData?.name} name='name' onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField type='text' label="Apellidos" variant="outlined" defaultValue={selectedData?.lastname} name='lastname' onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField type='text' label="Email" variant="outlined" defaultValue={selectedData?.email} name='email' disabled onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="demo-simple-select-label-2">Rol</InputLabel>
                <Select
                  label="Rol"
                  variant="outlined"
                  name="role"
                  value={selectedData?.role}
                  onChange={handleInputChange}
                >
                  {roles.map((role) => (
                    <MenuItem key={role._id} value={role._id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <input type="file" style={{ display: 'none', marginTop: '10px' }} name='avatar' onChange={handleInputChange} id="fileInput" />
              <label htmlFor="fileInput">
                <Button variant="contained" component="span">Imagen</Button>
              </label>
            </Grid>
          </Grid>
          <div style={{ marginTop: '25px', marginLeft: "150px" }}>
            <Button variant="contained" color="primary" onClick={() => handleSubmit('edit')} >
              Actualizar usuario
            </Button>
          </div>
        </form>
      </ModalGenerico>

      <ModalGenerico open={openSearch} handleOpen={handleOpenSearch}>
        <h1 style={{ marginBottom: "40px" }}>Mostrar Usuario </h1>
        <Grid item xs={5} md={5}>
          <img src={selectedData?.avatarClient} alt={selectedData?.name} style={{ width: "100%", borderRadius: "10px", margin: "0" }}></img>
          <h3>avatar</h3>
        </Grid>
        <Grid item xs={7} md={7}>
          <Typography id="userName" variant="h6" component="h2">
            {selectedData?.name}
            <h3>Nombre</h3>
          </Typography>
          <Typography id="userLastname" variant="h6" component="h2">
            {selectedData?.lastname}
            <h3>Apellido</h3>
          </Typography>
          <Typography id="userAddress" variant="h6" component="h2">
            {selectedData?.address}
            <h3>Dirección</h3>
          </Typography>
          <Typography id="userRole" variant="h6" component="h2">
            {selectedData?.role}
            <h3>Rol</h3>
          </Typography>
        </Grid>
      </ModalGenerico>

      <Backdrop
        sx={{ color: '#fff', zIndex: 10 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

    </div>
  )
}

export default User