import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
import { Button, InputLabel, Typography, Grid, TextField, Select, MenuItem, FormControl, Backdrop, CircularProgress, IconButton, Chip } from '@mui/material'

import { Role } from '../../../api/role'
import ModalGenerico from '../../../components/modal/ModalGenerico'
import { deleteUser, setUser, updateUser } from '../../../actions/users'
import { logout } from '../../../actions/auth';

import { useSnackbar } from 'notistack'



const Profile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const data = useSelector((state) => state.auth.user);
  const roleApi = new Role();
  const dispatch = useDispatch();
  const [openUpdate, setOpenUpdate] = useState(false);
  const navigate = useNavigate();
  const [imagen, setImagen] = useState(null);
  const [formInfo, setFormInfo] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    avatar: null
  });

  const handleOpenUpdate = async (state, dataId) => {
    setOpenUpdate(state);
  }

  const handleInputChange = (event) => {
    if (event.target.name === 'avatar') {
      const file = event.target.files ? event.target.files[0] : null;
      setFormInfo((formInfo) => ({ ...formInfo, [event.target.name]: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagen(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setFormInfo((formInfo) => ({ ...formInfo, [event.target.name]: event.target.value }));
      console.log(formInfo);
    }
  }

  const handleSubmit = async (form) => {
    setOpenBackdrop(true);
    // Pasar información a FormData (porque hay imágenes)
    const formData = new FormData();
    for (const [key, value] of Object.entries(formInfo)) {
      if (value !== "") {
        formData.append(key, value);
      }
    }

    if (form === 'edit') {
      await handleEdit(formData);
    }

    setOpenBackdrop(false);
  }

  const handleEdit = async (formData) => {
    setOpenUpdate(false);
    const res = await updateUser(data.email, formData);
    if (res && res.status === 200) {
      enqueueSnackbar(res.message, { variant: 'success' });
      getData();
    } else {
      enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
    }
  }

  const handleDelete = async (dataId) => {
    setOpenBackdrop(true);
    const res = await deleteUser(data.email, dispatch);
    if (res.status === 200) {
      enqueueSnackbar(res.message, { variant: 'success' });
      logout(dispatch);
      navigate("/");
    } else {
      enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
    }
    setOpenBackdrop(false);
  }

  const [roles, setRoles] = useState([]);

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
    <div>
      <h1 style={{ marginBottom: "20px" }}>Perfil Usuario</h1>
        <Grid item xs={12} md={12}>
          <img src={data?.avatarClient} alt={data?.name} style={{ maxWidth: "200px", borderRadius: "10px", margin: "0" }}></img>
        </Grid>
        <Grid item xs={7} md={7}>
          <Typography id="userName" variant="h6" component="h2">
            <b>Nombre: </b>{data?.name}
          </Typography>
          <Typography id="userLastname" variant="h6" component="h2">
            <b>Apellido: </b>{data?.lastname}
          </Typography>
          <Typography id="userEmail" variant="h6" component="h2">
            <b>Correo: </b>{data?.email}
          </Typography>
          <Typography id="userAddress" variant="h6" component="h2">
            <b>Dirección: </b>{data?.address ? 'Dirección' : 'No definido'}
          </Typography>
        </Grid>
        <Button variant='contained' color='primary' onClick={() => handleOpenUpdate(true)} style={{ margin: "2px 2px 10px 2px" }}>Editar usuario</Button>
        <Button variant='contained' color='error' onClick={() => handleDelete(data._id)} style={{ margin: "2px 2px 10px 2px" }}>Cancelar usuario</Button>

        <ModalGenerico open={openUpdate} handleOpen={handleOpenUpdate}>
        <h1 style={{ marginBottom: "40px" }}>Editar perfil</h1>
        <form>
          <Grid container spacing={2} display={'flex'}>
            <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <img src={data?.avatarClient} alt={data.name} style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: 20, borderStyle: 'solid' }} />
              <input type="file" style={{ display: 'none', marginTop: '10px' }} name='avatar' onChange={handleInputChange} id="fileInput" />
              <label htmlFor="fileInput">
                <Button variant="contained" component="span">Avatar</Button>
              </label>
            </Grid>
            <Grid item xs={6} >
              <TextField type='text' label="Nombre" variant="outlined" defaultValue={data?.name} name='name' onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField type='text' label="Apellido" variant="outlined" defaultValue={data?.lastname} name='lastname' onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField type='text' label="Email" variant="outlined" defaultValue={data?.email} name='email' disabled onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField type='password' label="Contraseña" variant="outlined" name='password' onChange={handleInputChange} />
            </Grid>
          </Grid>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
            <Button variant="contained" color="primary" onClick={() => handleSubmit('edit')} >
              Actualizar Perfil
            </Button>
          </div>
        </form>
      </ModalGenerico>
    </div>
  )
}

export default Profile