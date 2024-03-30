import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setProduct } from '../../../actions/product';
import { setCategory } from '../../../actions/category';
import { setClient } from '../../../actions/client';
import { setProvider } from '../../../actions/provider';
import { setSede } from '../../../actions/sede';
import { Backdrop, Button, Card, CardActions, CardContent, CardMedia, Chip, CircularProgress } from '@mui/material';
import { LandingMessage } from '../../../components/landingMessage/LandingMessage';
import './index.scss';

import CardCarrousel from '../../../components/cardCarrousel/CardCarrousel';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const cardCarrousel = (images) => {
  return <CardCarrousel images={images} />
}



const Index = () => {
  const dispatch = useDispatch();

  // Suscribirse a todos los store
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);
  const clients = useSelector((state) => state.clients);
  const providers = useSelector((state) => state.providers);
  const sedes = useSelector((state) => state.sedes);


  useEffect(() => {
    getData();
  }, [setProduct, setCategory])

  const [openBackdrop, setOpenBackdrop] = useState(false);

  const getData = async () => {
    setOpenBackdrop(true);
    await setProduct(dispatch);
    await setCategory(dispatch);
    await setClient(dispatch);
    await setProvider(dispatch);
    await setSede(dispatch);
    setOpenBackdrop(false);
  }

  const [value, setValue] = useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <LandingMessage/>
      <h1>Nuestros productos</h1>
      <div className="categories" style={{ width: '80%' }}>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} aria-label="basic tabs example">
            {categories.map((category) => (
              category.active ?
                <Tab label={category.name} onClick={() => handleChange(categories.indexOf(category))} />
                : <></>
            ))}
          </Tabs>
        </Box>
        {categories.map((category) => (
          <CustomTabPanel value={value} index={categories.indexOf(category)}>
            {products.map((product) => (
              product?.active && (product?.category[0]?._id === category?._id || product?.category[1]?._id === category?._id) ?
                <Card sx={{ maxWidth: 345, minWidth: 200 }}>

                  <CardMedia
                    component={() => cardCarrousel(product.imagesClient)}
                    alt={product?.name}
                    height="140"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product?.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ marginTop: 20 }}>
                      {product?.status ? <Chip label="Disponible" color="success" /> : <Chip label="Agotado" color="error" />}
                    </Typography>

                  </CardContent>
                  <CardActions>
                    <Button size="small" disabled={!product?.status} >Comprar</Button>

                  </CardActions>
                </Card>
                : <></>
            ))}
          </CustomTabPanel>
        ))}

        <div className='sedes seccion'>
          <h1>Nuestras sedes</h1>
          <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap' }}>


            {sedes.map((sede) => (
              sede?.active ?
                <Card sx={{ maxWidth: 345, minWidth: 100 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {sede?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <b>Dirección</b><br />
                      {sede?.address.country}, {sede?.address.department}, {sede?.address.municipality}, {sede?.address.nomenclature}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <a target="_blank" href={"https://www.google.com/maps/dir/" + sede?.address.country + ", " + sede?.address.department + ", " + sede?.address.municipality + ", " + sede?.address.nomenclature}><Button size="small">Ver en Mapa</Button></a>
                  </CardActions>
                </Card>
                : <></>
            ))}
          </div>
        </div>
        <div className='clientes seccion'>
          <h1>Nuestros clientes</h1>
          <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap' }}>
            {clients.map((client) => (
              client?.active ?
                <Card sx={{ minWidth: 200, maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    alt={client?.name}
                    height="140"
                    image={client?.avatarClient}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {client?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <b>Dirección</b><br />
                      {client?.address ? <p>{client?.address.country}, {client?.address.department}, {client?.address.municipality}, {client?.address.nomenclature}</p> : <p>No definido</p>}
                    </Typography>
                    {client?.address?.country === 'Colombia' || !client?.address ? <Chip label='Nacional' color="primary" /> : <Chip label='Internacional' color="success" />}
                  </CardContent>
                </Card>
                : <></>
            ))}
          </div>
        </div>
        <div className='proveedores seccion' style={{ marginBottom: '100px' }}>
          <h1>Nuestros proveedores</h1>
          <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap' }}>
            {providers.map((provider) => (
              provider?.active ?
                <Card sx={{ minWidth: 200, maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    alt={provider?.name}
                    height="140"
                    image={provider?.avatarClient}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {provider?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <b>Dirección</b><br />
                      {provider?.address ? <p>{provider?.address.country}, {provider?.address.department}, {provider?.address.municipality}, {provider?.address.nomenclature}</p> : <p>No definido</p>}
                    </Typography>
                    {provider?.address?.country === 'Colombia' || !provider?.address ? <Chip label='Nacional' color="primary" /> : <Chip label='Internacional' color="success" />}
                  </CardContent>

                </Card>
                : <></>
            ))}
          </div>
        </div>

      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: 10 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default Index