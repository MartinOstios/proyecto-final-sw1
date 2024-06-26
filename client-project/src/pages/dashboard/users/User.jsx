import React, { useEffect, useState } from 'react'
import { Button, InputLabel, Typography, Grid, TextField, Select, MenuItem, FormControl, Backdrop, CircularProgress, IconButton, Chip } from '@mui/material'
import TableGenerica from '../../../components/table/TableGenerico'
import ModalGenerico from '../../../components/modal/ModalGenerico'
import images from '../../../assets/images'

import { useDispatch, useSelector } from 'react-redux'

import { Role } from '../../../api/role';

import { createUser, deleteUser, setUser, updateUser } from '../../../actions/users'

import { useSnackbar } from 'notistack'
import { Address } from '../../../components/address/Address'


const User = () => {
  const { enqueueSnackbar } = useSnackbar();
  const data = useSelector((state) => state.users);
  const roleApi = new Role();

  const dispatch = useDispatch();
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
    active: false,
    avatar: null,
    role: '',
    country: '',
    department: '',
    municipality: '',
    nomenclature: ''
  });

  const [country, setCountry] = useState({
    code: '',
    label: '',
    phone: ''
  });
  const [department, setDepartment] = useState('');
  const [municipality, setMunicipality] = useState('');


  const { role, active } = formInfo;

  // ---- PREVISUALIZACIÓN DE IMÁGENES
  const [imagen, setImagen] = useState(null);


  // ---- INICIO MODALES

  const handleOpenUpdate = async (state, dataId) => {
    setFormInfo({
      name: '',
      lastname: '',
      email: '',
      password: '',
      active: false,
      avatar: null,
      role: '',
      country: '',
      department: '',
      municipality: '',
      nomenclature: ''
    })
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
    setFormInfo({
      name: '',
      lastname: '',
      email: '',
      password: '',
      active: false,
      avatar: null,
      role: '',
      country: '',
      department: '',
      municipality: ''
    })
    setOpenCreate(state);
  }

  const findDataById = (dataId) => {
    return data.find((data) => data._id === dataId);
  }

  // ---------- FIN MODALES


  // ---------- INICIO HANDLE CHANGES
  const handleInputChange = (event) => {
    if (event.target.name === 'avatar') {
      const file = event.target.files ? event.target.files[0] : null;
      setFormInfo((formInfo) => ({ ...formInfo, [event.target.name]: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagen(reader.result);
      };
      reader.readAsDataURL(file);
    }

    else {
      setFormInfo((formInfo) => ({ ...formInfo, [event.target.name]: event.target.value }));
    }
  }

  const handleCountry = (value) => {
    setCountry(value);
  }

  const handleDepartment = (value) => {
    setDepartment(value);
  }

  const handleMunicipality = (value) => {
    setMunicipality(value);
  }

  // ---------- FIN HANDLE CHANGES


  // ---------- INICIO HANDLE SUBMIT

  const handleSubmit = async (form) => {
    setOpenBackdrop(true);
    // Pasar información a FormData (porque hay imágenes)
    const formData = new FormData();
    for (const [key, value] of Object.entries(formInfo)) {
      if (value !== '') {
        formData.append(key, value);
      }
    }

    formData.append('country', country.label);
    formData.append('department', department);
    formData.append('municipality', municipality);

    if (form === 'create') {
      await handleCreate(formData)
    }

    if (form === 'edit') {
      await handleEdit(formData);
    }

    setOpenBackdrop(false);
  }

  const handleCreate = async (formData) => {
    setOpenCreate(false);
    const res = await createUser(formData, dispatch);
    if (res.status === 200) {
      enqueueSnackbar(res.message, { variant: 'success' });
    } else {
      enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
    }
  }

  const handleEdit = async (formData) => {
    setOpenUpdate(false);
    const res = await updateUser(selectedData.email, formData);
    if (res && res.status === 200) {
      enqueueSnackbar(res.message, { variant: 'success' });
      await getData();
    } else {
      enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
    }
  }

  const handleDelete = async (dataId) => {
    setOpenBackdrop(true);
    const data = findDataById(dataId);
    const res = await deleteUser(data.email, dispatch);
    if (res.status === 200) {
      enqueueSnackbar(res.message, { variant: 'success' });
    } else {
      enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
    }
    setOpenBackdrop(false);
  }

  // ---------- FIN HANDLE SUBMIT


  // ---------- EXTRAS
  const [roles, setRoles] = useState([]);

  // ----------- FIN EXTRAS


  // ---- CARGAR INFO USUARIOS AL CARGAR PÁGINA
  useEffect(() => {
    getData();
    getRoles();
  }, []);

  const getData = async () => {
    setOpenBackdrop(true);
    const data = await setUser(dispatch);
    if (!data) {
      enqueueSnackbar('No fue posible obtener la información', { variant: 'error' });
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Usuarios</h1>
      <Button variant='contained' color='primary' onClick={() => handleOpenCreate(true)} style={{ margin: "2px 2px 10px 2px" }}>Crear usuario</Button>
      <TableGenerica
        columns={
          [
            { field: 'name', headerName: 'Nombre', width: 200 },
            { field: 'lastname', headerName: 'Apellido', width: 200 },
            { field: 'email', headerName: 'Correo', width: 200 },
            {
              field: 'active', headerName: 'Activo', width: 150, renderCell: (params) => (
                params.row.active ? <Chip label="Activo" color="primary" /> : <Chip label="Inactivo" color="error" />
              )
            }
          ]
        }
        rows={data}
        handleOpenSearch={handleOpenSearch}
        handleOpenUpdate={handleOpenUpdate}
        handleDelete={handleDelete}
      />

      <ModalGenerico open={openCreate} handleOpen={handleOpenCreate}>
        <h1 style={{ marginBottom: "15px" }}>Crear usuario </h1>
        <form>
          <Grid container spacing={2} display={'flex'}>
            <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <img src={imagen ? imagen : images.defaultImage} alt="Previsualización" style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: 20, borderStyle: 'solid' }} />
              <input type="file" style={{ display: 'none', marginTop: '10px' }} name='avatar' onChange={handleInputChange} id="fileInput" />
              <label htmlFor="fileInput">
                <Button variant="contained" component="span">Avatar</Button>
              </label>
            </Grid>
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
            <Address handleCountry={handleCountry} country={country} handleDepartment={handleDepartment} department={department} handleMunicipality={handleMunicipality} municipality={municipality} />
            <Grid item xs={6}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="demo-simple-select-label-2">Rol</InputLabel>
                <Select
                  label="Rol"
                  variant="outlined"
                  name="role"
                  value={role}
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

          </Grid>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
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
            <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <img src={imagen ? imagen : selectedData?.avatarClient} alt="Previsualización" style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: 20, borderStyle: 'solid' }} />
              <input type="file" style={{ display: 'none', marginTop: '10px' }} name='avatar' onChange={handleInputChange} id="fileInput" />
              <label htmlFor="fileInput">
                <Button variant="contained" component="span">Avatar</Button>
              </label>
            </Grid>
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
                  value={role}
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
            <Grid item xs={6}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="demo-simple-select-label-2">Activo</InputLabel>
                <Select
                  label="Activo"
                  variant="outlined"
                  name="active"
                  value={active}
                  onChange={handleInputChange}
                >
                  <MenuItem key={true} value={true}>
                    Activo
                  </MenuItem>
                  <MenuItem key={false} value={false}>
                    Inactivo
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
            <Button variant="contained" color="primary" onClick={() => handleSubmit('edit')} >
              Actualizar usuario
            </Button>
          </div>
        </form>
      </ModalGenerico>

      <ModalGenerico open={openSearch} handleOpen={handleOpenSearch}>
        <h1 style={{ marginBottom: "20px" }}>Mostrar Usuario </h1>
        <Grid item xs={12} md={12}>
          <img src={selectedData?.avatarClient} alt={selectedData?.name} style={{ maxWidth: "200px", borderRadius: "10px", margin: "0" }}></img>
        </Grid>
        <Grid item xs={7} md={7}>
          <Typography id="userName" variant="h6" component="h2">
            <b>Nombre: </b>{selectedData?.name}
          </Typography>
          <Typography id="userLastname" variant="h6" component="h2">
            <b>Apellido: </b>{selectedData?.lastname}
          </Typography>
          <Typography id="userEmail" variant="h6" component="h2">
            <b>Correo: </b>{selectedData?.email}
          </Typography>
          <Typography id="userAddress" variant="h6" component="h2">
            <b>Pais: </b>{selectedData?.address ? selectedData.address.country : 'No definido'}
          </Typography>
          <Typography id="userAddress" variant="h6" component="h2">
            <b>Departamento: </b>{selectedData?.address ? selectedData.address.department : 'No definido'}
          </Typography>
          <Typography id="userAddress" variant="h6" component="h2">
            <b>Municipio: </b>{selectedData?.address ? selectedData.address.municipality : 'No definido'}
          </Typography>
          <Typography id="userAddress" variant="h6" component="h2">
            <b>Nomenclatura: </b>{selectedData?.address ? selectedData.address.nomenclature : 'No definido'}
          </Typography>
          <Typography id="userActive" variant="h6" component="h2">
            <b>Activo: </b>{selectedData?.active ? 'Sí' : 'No'}
          </Typography>
          <Typography id="userRole" variant="h6" component="h2">
            <b>Rol: </b>{selectedData?.role ? selectedData.role.name : 'No definido'}
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