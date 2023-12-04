import React, { useEffect, useState } from 'react'
import { Button, InputLabel, Typography, Grid, TextField, Select, MenuItem, FormControl, Backdrop, CircularProgress, IconButton, Chip } from '@mui/material'
import TableGenerica from '../../../components/table/TableGenerico'
import ModalGenerico from '../../../components/modal/ModalGenerico'
import images from '../../../assets/images'

import { useDispatch, useSelector } from 'react-redux'

/* import { Address } from '../../../api/address'; */

import { createProvider, deleteProvider, setProvider, updateProvider } from '../../../actions/provider'

import { useSnackbar } from 'notistack'

const Provider = () => {
  const { enqueueSnackbar } = useSnackbar();
  const data = useSelector((state) => state.providers);
  /* const addressApi = new Address(); */

  const dispatch = useDispatch();
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [formInfo, setFormInfo] = useState({
    name: '',
    avatar: null,
    address: '',
  });

  // ---- PREVISUALIZACIÓN DE IMÁGENES
  const [imagen, setImagen] = useState(null);

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
      if (value !== "") {
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
    setOpenCreate(false);
    const res = await createProvider(formData, dispatch);
    if (res.status === 200) {
      enqueueSnackbar(res.message, { variant: 'success' });
    } else {
      enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
    }
  }

  const handleEdit = async (formData) => {
    setOpenUpdate(false);
    const res = await updateProvider(selectedData._id, formData, dispatch);
    if (res && res.status === 200) {
      enqueueSnackbar(res.message, { variant: 'success' });
    } else {
      enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
    }
  }

  const handleDelete = async (dataId) => {
    setOpenBackdrop(true);
    const res = await deleteProvider(dataId, dispatch);
    if (res.status === 200) {
      enqueueSnackbar(res.message, { variant: 'success' });
    } else {
      enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
    }
    setOpenBackdrop(false);
  }

  // ---------- FIN HANDLE SUBMIT

  // ---- CARGAR INFO USUARIOS AL CARGAR PÁGINA
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setOpenBackdrop(true);
    const data = await setProvider(dispatch);
    if (!data) {
      enqueueSnackbar('No fue posible obtener la información', { variant: 'error' });
    }
    setOpenBackdrop(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Proveedores</h1>
      <Button variant='contained' color='primary' onClick={() => handleOpenCreate(true)} style={{ margin: "2px 2px 10px 2px" }}>Crear Proveedor</Button>
      <TableGenerica
        columns={
          [
            { field: 'name', headerName: 'Nombre', width: 200 },
            { field: 'address', headerName: 'Direccion', width: 200 },
          ]
        }
        rows={data}
        handleOpenSearch={handleOpenSearch}
        handleOpenUpdate={handleOpenUpdate}
        handleDelete={handleDelete}
      />

      <ModalGenerico open={openCreate} handleOpen={handleOpenCreate}>
        <h1 style={{ marginBottom: "15px" }}>Crear Proveedor </h1>
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
            {/*  <Grid item xs={6}>
              <TextField type='text' label="Dirección" variant="outlined" name='address' onChange={handleInputChange} />
            </Grid> */}
          </Grid>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
            <Button variant="contained" color="primary" onClick={() => handleSubmit('create')}>
              Crear Proveedor
            </Button>
          </div>
        </form>
      </ModalGenerico>

      <ModalGenerico open={openUpdate} handleOpen={handleOpenUpdate}>
        <h1 style={{ marginBottom: "40px" }}>Actualizar Proveedor</h1>
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
          </Grid>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
            <Button variant="contained" color="primary" onClick={() => handleSubmit('edit')} >
              Actualizar Proveedor
            </Button>
          </div>
        </form>
      </ModalGenerico>

      <ModalGenerico open={openSearch} handleOpen={handleOpenSearch}>
        <h1 style={{ marginBottom: "20px" }}>Mostrar Proveedor </h1>
        <Grid item xs={12} md={12}>
          <img src={selectedData?.avatarClient} alt={selectedData?.name} style={{ maxWidth: "200px", borderRadius: "10px", margin: "0" }}></img>
        </Grid>
        <Grid item xs={7} md={7}>
          <Typography id="ProviderName" variant="h6" component="h2">
            <b>Nombre: </b>{selectedData?.name}
          </Typography>
          <Typography id="ProviderAddress" variant="h6" component="h2">
            <b>Dirección: </b>{selectedData?.address ? 'Dirección' : 'No definido'}
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

export default Provider