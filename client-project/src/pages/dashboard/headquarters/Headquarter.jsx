import React, { useEffect, useState } from 'react'
import { Button, InputLabel, Typography, Grid, TextField, Select, MenuItem, FormControl, Backdrop, CircularProgress, Chip } from '@mui/material'
import TableGenerica from '../../../components/table/TableGenerico'
import ModalGenerico from '../../../components/modal/ModalGenerico'
import { createSede, deleteSede, setSede, updateSede } from '../../../actions/sede'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Address } from '../../../components/address/Address'

const Headquarter = () => {
  const { enqueueSnackbar } = useSnackbar();
  const data = useSelector((state) => state.sedes);
  const dispatch = useDispatch();
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [selectedData, setSelectedData] = useState(null);


  const [country, setCountry] = useState({
    code: '',
    label: '',
    phone: ''
  });
  const [department, setDepartment] = useState('');
  const [municipality, setMunicipality] = useState('');



  const [formInfo, setFormInfo] = useState({
    name: '',
    country: '',
    department: '',
    municipality: '',
    nomenclature: '',
    contact: '',
    active: false
  });

  const { active } = formInfo;

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
    setFormInfo((formInfo) => ({ ...formInfo, [event.target.name]: event.target.value }));
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

    const filterData = {};
    for (const [key, value] of Object.entries(formInfo)) {
      if (value !== "") {
        filterData[key] = value;
      }
    }

    filterData.country = country.label;
    filterData.department = department;
    filterData.municipality = municipality;

    if (form === 'create') {
      await handleCreate(filterData)
    }

    if (form === 'edit') {
      await handleEdit(filterData);
    }

    setOpenBackdrop(false);
  }

  const handleCreate = async (data) => {
    // Llamar API
    setOpenCreate(false);
    const res = await createSede(data, dispatch);
    // Llamar al Store
    if (res.status === 200) {
      enqueueSnackbar(res.message, { variant: 'success' });
    } else {
      enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
    }
  }

  const handleEdit = async (data) => {
    // Llamar a la API
    setOpenUpdate(false);
    const res = await updateSede(selectedData._id, data);
    // Llamar al Store
    if (res && res.status === 200) {
      enqueueSnackbar(res.message, { variant: 'success' });
      getData();
    } else {
      enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
    }
  }

  const handleDelete = async (dataId) => {
    setOpenBackdrop(true);
    const res = await deleteSede(dataId, dispatch);
    if (res.status === 200) {
      enqueueSnackbar(res.message, { variant: 'success' });
      getData();
    } else {
      enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
    }
    setOpenBackdrop(false);
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setOpenBackdrop(true);
    const data = await setSede(dispatch);
    if (!data) {
      enqueueSnackbar('No fue posible obtener la información', { variant: 'error' });
    }
    setOpenBackdrop(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Sedes</h1>
      <Button variant='contained' color='primary' onClick={() => handleOpenCreate(true)} style={{ margin: "2px 2px 10px 2px" }}>Crear Sede</Button>
      <TableGenerica
        columns={
          [
            { field: '_id', headerName: 'ID', width: 100 },
            { field: 'name', headerName: 'Nombre', width: 200 },
            { field: 'contact', headerName: 'Contacto', width: 200 },
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
        <h1 style={{ marginBottom: "15px" }}>Crear Sede </h1>
        <form>
          <Grid container spacing={2} display={'flex'}>
            <Grid item xs={6} >
              <TextField type='text' label="Nombre" variant="outlined" name='name' onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField type='text' label="Contacto" variant="outlined" name='contact' onChange={handleInputChange} />
            </Grid>

            <Address handleCountry={handleCountry} country={country} handleDepartment={handleDepartment} department={department} handleMunicipality={handleMunicipality} municipality={municipality} />

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
            <Button variant="contained" color="primary" onClick={() => handleSubmit('create')}>
              Crear Sede
            </Button>
          </div>
        </form>
      </ModalGenerico>

      <ModalGenerico open={openUpdate} handleOpen={handleOpenUpdate}>
        <h1 style={{ marginBottom: "40px" }}>Actualizar Sede</h1>
        <form>
          <Grid container spacing={2} display={'flex'}>
            <Grid item xs={6} >
              <TextField type='text' label="Nombre" variant="outlined" defaultValue={selectedData?.name} name='name' onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField type='text' label="Contacto" variant="outlined" defaultValue={selectedData?.contact} name='contact' onChange={handleInputChange} />
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
              Actualizar Sede
            </Button>
          </div>
        </form>
      </ModalGenerico>

      <ModalGenerico open={openSearch} handleOpen={handleOpenSearch}>
        <h1 style={{ marginBottom: "20px" }}>Mostrar Sede</h1>
        <Grid item xs={7} md={7}>
          <Typography id="sedeName" variant="h6" component="h2">
            <b>Nombre: </b>{selectedData?.name}
          </Typography>
          <Typography id="sedeAddress" variant="h6" component="h2">
            <b>Pais: </b>{selectedData?.address ? selectedData.address.country : 'No definido'}
          </Typography>
          <Typography id="sedeAddress" variant="h6" component="h2">
            <b>Departamento: </b>{selectedData?.address ? selectedData.address.department : 'No definido'}
          </Typography>
          <Typography id="sedeAddress" variant="h6" component="h2">
            <b>Municipio: </b>{selectedData?.address ? selectedData.address.municipality : 'No definido'}
          </Typography>
          <Typography id="sedeAddress" variant="h6" component="h2">
            <b>Nomenclatura: </b>{selectedData?.address ? selectedData.address.nomenclature : 'No definido'}
          </Typography>
          <Typography id="sedeContact" variant="h6" component="h2">
            <b>Contacto: </b>{selectedData?.contact}
          </Typography>
          <Typography id="sedeActive" variant="h6" component="h2">
            <b>Activo: </b>{selectedData?.active ? 'Sí' : 'No'}
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

export default Headquarter