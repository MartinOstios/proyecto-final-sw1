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
import { Backdrop, Button, Card, CardActions, CardContent, CardMedia, CircularProgress } from '@mui/material';
import './index.scss';

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
      <h1>Nuestros productos</h1>
      <div className="categories" style={{ width: '80%' }}>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} aria-label="basic tabs example">
            {categories.map((category) => (
              <Tab label={category.name} onClick={() => handleChange(categories.indexOf(category))} />
            ))}
          </Tabs>
        </Box>
        {categories.map((category) => (
          <CustomTabPanel value={value} index={categories.indexOf(category)}>
            {products.map((product) => (
              product?.category[0]?._id === category?._id || product?.category[1]?._id === category?._id ?
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    alt={product?.name}
                    height="140"
                    image={product?.imagesClient[0]}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with over 6,000
                      species, ranging across all continents except Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
                : <></>
            ))}
          </CustomTabPanel>
        ))}

      <div className='sedes seccion'>
        <h1>Nuestras sedes</h1>
        {sedes.map((sede) => (
          <h2>{sede.name}</h2>
        ))}
      </div>
      <div className='clientes seccion'>
        <h1>Nuestras clientes</h1>
        {clients.map((client) => (
          <h2>{client.name}</h2>
        ))}
      </div>
      <div className='proveedores seccion'>
        <h1>Nuestras proveedores</h1>
        {providers.map((provider) => (
          <h2>{provider.name}</h2>
        ))}
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