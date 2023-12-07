import React, { useEffect, useState } from 'react'
import { Button, InputLabel, Typography, Grid, TextField, Select, MenuItem, FormControl, Backdrop, CircularProgress, Chip } from '@mui/material'
import TableGenerica from '../../../components/table/TableGenerico'
import ModalGenerico from '../../../components/modal/ModalGenerico'
import { Category } from '../../../api/category'
import { Provider } from '../../../api/provider'
import { createProduct, deleteProduct, setProduct, updateProduct } from '../../../actions/product'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import images from '../../../assets/images'
const Products = () => {
  const { enqueueSnackbar } = useSnackbar();
  const data = useSelector((state) => state.products);
  const categoryApi = new Category();
  const providerApi = new Provider();
  const dispatch = useDispatch();
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [formInfo, setFormInfo] = useState({
    name: '',
    description: '',
    category: '',
    provider: '',
    imagen1: '',
    imagen2: '',
    imagen3: '',
    active: false,
    status: false
  });

  const { active, status } = formInfo;

  const [imagenUno, setImagenUno] = useState(null);
  const [imagenDos, setImagenDos] = useState(null);
  const [imagenTres, setImagenTres] = useState(null);

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
    if (event.target.name === 'imagen1' || event.target.name === 'imagen2' || event.target.name === 'imagen3') {
      const file = event.target.files ? event.target.files[0] : null;
      setFormInfo((formInfo) => ({ ...formInfo, [event.target.name]: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        if (event.target.name === 'imagen1') {
          setImagenUno(reader.result);
        }
        if (event.target.name === 'imagen2') {
          setImagenDos(reader.result);
        }
        if (event.target.name === 'imagen3') {
          setImagenTres(reader.result);
        }
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

    const formData = new FormData();
    if (formInfo.imagen1 !== '') {
      formData.append('images', formInfo.imagen1);
    }

    if (formInfo.imagen2 !== '') {
      formData.append('images', formInfo.imagen2);
    }

    if (formInfo.imagen3 !== '') {
      formData.append('images', formInfo.imagen3);
    }

    if (formInfo.name !== '') {
      formData.append('name', formInfo.name);
    }
    if (formInfo.description !== '') {
      formData.append('description', formInfo.description);
    }
    if (formInfo.category !== '') {
      formData.append('category', formInfo.category);
    }
    if (formInfo.provider !== '') {
      formData.append('provider', formInfo.provider);
    }

    formData.append('active', formInfo.active);
    formData.append('status', formInfo.status);
    if (form === 'create') {
      await handleCreate(formData)
    }

    if (form === 'edit') {
      await handleEdit(formData);
    }

    setOpenBackdrop(false);
  }

  const handleCreate = async (data) => {
    // Llamar API
    setOpenCreate(false);
    const res = await createProduct(data);
    // Llamar al Store
    if (res.status === 200) {
      enqueueSnackbar(res.message, { variant: 'success' });
      await getData();
    } else {
      enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
    }
  }

  const handleEdit = async (data) => {
    // Llamar a la API
    setOpenUpdate(false);
    const res = await updateProduct(selectedData._id, data);
    // Llamar al Store
    if (res && res.status === 200) {
      enqueueSnackbar(res.message, { variant: 'success' });
      await getData();
    } else {
      enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
    }
  }

  const handleDelete = async (dataId) => {
    setOpenBackdrop(true);
    const res = await deleteProduct(dataId, dispatch);
    if (res && res.status === 200) {
      enqueueSnackbar(res.message, { variant: 'success' });
    } else {
      enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
    }
    setOpenBackdrop(false);
  }

  // ---------- FIN HANDLE SUBMIT

  // ---------- EXTRAS
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);

  // ----------- FIN EXTRAS

  // ---- CARGAR INFO USUARIOS AL CARGAR PÁGINA
  useEffect(() => {
    getData();
    getCategories();
    getProviders();
  }, []);

  const getData = async () => {
    setOpenBackdrop(true);
    const data = await setProduct(dispatch);
    if (!data) {
      enqueueSnackbar('No fue posible obtener la información', { variant: 'error' });
    }
    setOpenBackdrop(false);
  };

  const getCategories = async () => {
    const data = await categoryApi.showCategories();
    if (data) {
      setCategories(data);
    }
  }

  const getProviders = async () => {
    const data = await providerApi.showProviders();
    if (data) {
      setProviders(data);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Productos</h1>
      <Button variant='contained' color='primary' onClick={() => handleOpenCreate(true)} style={{ margin: "2px 2px 10px 2px" }}>Crear Producto</Button>
      <TableGenerica
        columns={
          [
            { field: 'name', headerName: 'Nombre', width: 200 },
            { field: 'category', headerName: 'Categoría', width: 200, valueGetter: (params) => params.row.category[0] ? params.row.category[0].name : 'No definido' },
            { field: 'provider', headerName: 'Proveedor', width: 200, valueGetter: (params) => params.row.provider ? params.row.provider.name : 'No definido' },
            {
              field: 'active', headerName: 'Activo', width: 150, renderCell: (params) => (
                params.row.active ? <Chip label="Activo" color="primary" /> : <Chip label="Inactivo" color="error" />
              )
            },
            {
              field: 'status', headerName: 'Estado', width: 150, renderCell: (params) => (
                params.row.status ? <Chip label="Disponible" color="primary" /> : <Chip label="Agotado" color="error" />
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
        <h1 style={{ marginBottom: "15px" }}>Crear Producto </h1>
        <form>
          <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 20, marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <img src={imagenUno ? imagenUno : images.defaultImage} alt="Previsualización" style={{ width: '100px', height: '100px', borderRadius: '50%', borderStyle: 'solid' }} />
              <input type="file" style={{ display: 'none', marginTop: '10px' }} name='imagen1' onChange={handleInputChange} id="fileInput1" />
              <label htmlFor="fileInput1">
                <Button variant="contained" component="span">Imagen 1</Button>
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <img src={imagenDos ? imagenDos : images.defaultImage} alt="Previsualización" style={{ width: '100px', height: '100px', borderRadius: '50%', borderStyle: 'solid' }} />
              <input type="file" style={{ display: 'none', marginTop: '10px' }} name='imagen2' onChange={handleInputChange} id="fileInput2" />
              <label htmlFor="fileInput2">
                <Button variant="contained" component="span">Imagen 2</Button>
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <img src={imagenTres ? imagenTres : images.defaultImage} alt="Previsualización" style={{ width: '100px', height: '100px', borderRadius: '50%', borderStyle: 'solid' }} />
              <input type="file" style={{ display: 'none', marginTop: '10px' }} name='imagen3' onChange={handleInputChange} id="fileInput3" />
              <label htmlFor="fileInput3">
                <Button variant="contained" component="span">Imagen 3</Button>
              </label>
            </div>
          </Grid>
          <Grid container spacing={2} display={'flex'}>
            <Grid item xs={6} >
              <TextField type='text' label="Nombre" variant="outlined" name='name' onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField type='text' label="Descripcion" variant="outlined" name='description' onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="demo-simple-select-label-2">Categoria</InputLabel>
                <Select
                  label="Categoria"
                  variant="outlined"
                  name="category"
                  value={formInfo.category}
                  onChange={handleInputChange}
                >
                  {categories.map((category) => (
                    category.active && category._id !== '656df1c115cc52697e6b100f' ?
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                    : <></>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="demo-simple-select-label-2">Proveedor</InputLabel>
                <Select
                  label="Proveedor"
                  variant="outlined"
                  name="provider"
                  value={formInfo.provider}
                  onChange={handleInputChange}
                >
                  {providers.map((provider) => (
                    provider.active ?
                    <MenuItem key={provider._id} value={provider._id}>
                      {provider.name}
                    </MenuItem>
                    : <></>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="demo-simple-select-label-2">Estado</InputLabel>
                <Select
                  label="Activo"
                  variant="outlined"
                  name="status"
                  value={status}
                  onChange={handleInputChange}
                >
                  <MenuItem key={true} value={true}>
                    Disponible
                  </MenuItem>
                  <MenuItem key={false} value={false}>
                    Agotado
                  </MenuItem>
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
            <Button variant="contained" color="primary" onClick={() => handleSubmit('create')}>
              Crear Producto
            </Button>
          </div>
        </form>
      </ModalGenerico>

      <ModalGenerico open={openUpdate} handleOpen={handleOpenUpdate}>
        <h1 style={{ marginBottom: "40px" }}>Actualizar Producto</h1>
        <form>
          <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 20, marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <img src={imagenUno ? imagenUno : selectedData?.imagesClient[0] ?? selectedData?.imagesClient[0]} alt="Previsualización" style={{ width: '100px', height: '100px', borderRadius: '50%', borderStyle: 'solid' }} />
              <input type="file" style={{ display: 'none', marginTop: '10px' }} name='imagen1' onChange={handleInputChange} id="fileInput1" />
              <label htmlFor="fileInput1">
                <Button variant="contained" component="span">Imagen 1</Button>
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <img src={imagenDos ? imagenDos : selectedData?.imagesClient[1] ?? selectedData?.imagesClient[1]} alt="Previsualización" style={{ width: '100px', height: '100px', borderRadius: '50%', borderStyle: 'solid' }} />
              <input type="file" style={{ display: 'none', marginTop: '10px' }} name='imagen2' onChange={handleInputChange} id="fileInput2" />
              <label htmlFor="fileInput2">
                <Button variant="contained" component="span">Imagen 2</Button>
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <img src={imagenTres ? imagenTres : selectedData?.imagesClient[2] ?? selectedData?.imagesClient[2]} alt="Previsualización" style={{ width: '100px', height: '100px', borderRadius: '50%', borderStyle: 'solid' }} />
              <input type="file" style={{ display: 'none', marginTop: '10px' }} name='imagen3' onChange={handleInputChange} id="fileInput3" />
              <label htmlFor="fileInput3">
                <Button variant="contained" component="span">Imagen 3</Button>
              </label>
            </div>
          </Grid>
          <Grid container spacing={2} display={'flex'}>
            <Grid item xs={6} >
              <TextField type='text' label="Nombre" variant="outlined" defaultValue={selectedData?.name} name='name' onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField type='text' label="Descripción" variant="outlined" defaultValue={selectedData?.description} name='description' onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="demo-simple-select-label-2">Categoria</InputLabel>
                <Select
                  label="Categoria"
                  variant="outlined"
                  name="category"
                  value={formInfo.category}
                  onChange={handleInputChange}
                >
                  {categories.map((category) => (
                    category.active && category._id !== '656df1c115cc52697e6b100f' ?
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                    : <></>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="demo-simple-select-label-2">Estado</InputLabel>
                <Select
                  label="Estado"
                  variant="outlined"
                  name="status"
                  value={status}
                  onChange={handleInputChange}
                >
                  <MenuItem key={true} value={true}>
                    Disponible
                  </MenuItem>
                  <MenuItem key={false} value={false}>
                    Agotado
                  </MenuItem>
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
              Actualizar Producto
            </Button>
          </div>
        </form>
      </ModalGenerico>

      <ModalGenerico open={openSearch} handleOpen={handleOpenSearch}>
        <h1 style={{ marginBottom: "20px" }}>Mostrar Producto</h1>
        <Grid item xs={12} md={12}>
          {selectedData?.imagesClient.map((image) =>
            <img src={image} alt={selectedData?.name} style={{ maxWidth: "200px", borderRadius: "10px", margin: "0" }}></img>
          )}

        </Grid>
        <Grid item xs={7} md={7}>
          <Typography id="productName" variant="h6" component="h2">
            <b>Nombre: </b>{selectedData?.name}
          </Typography>
          <Typography id="productCategory" variant="h6" component="h2">
            <b>Categoria: </b>{selectedData?.category[0] ? selectedData.category[0].name : 'No definido'}
          </Typography>
          <Typography id="productCategory" variant="h6" component="h2">
            <b>Proveedor: </b>{selectedData?.provider ? selectedData.provider.name : 'No definido'}
          </Typography>
          <Typography id="productDescription" variant="h6" component="h2">
            <b>Descripción: </b>{selectedData?.description}
          </Typography>
          <Typography id="productActive" variant="h6" component="h2">
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

export default Products