import { Box, TextField, Button, Backdrop, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { login } from '../../../actions/auth'

import { useSnackbar } from 'notistack'

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [openBackdrop, setOpenBackdrop] = useState(false);


  const handleSubmit = async () => {
    setOpenBackdrop(true);
    const res = await login(loginData, dispatch);
    if (res.user) {
      if (res.user.active) {
        enqueueSnackbar(`${res.user.name} iniciaste sesión correctamente`, { variant: 'success' });
        navigate('/dashboard');
      } else{
        enqueueSnackbar(`Para iniciar sesión debe activar su cuenta`, { variant: 'info' });
        navigate('/activate');
      }

    } else {
      enqueueSnackbar(`El correo o la contraseña son incorrectos`, { variant: 'error' });
    }
    setOpenBackdrop(false);
  };

  const handleChange = (event) => {
    setLoginData(loginData => ({ ...loginData, [event.target.name]: event.target.value }))
  };



  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '40ch' },
            'textAlign': 'center',
            'borderStyle': 'solid',
            'backgroundColor': 'white',
            'paddingTop': 4,
            'paddingBottom': 4,
            'paddingRight': 2,
            'paddingLeft': 2,
            'borderRadius': 3,
            'marginTop': 10
          }}
          noValidate
          autoComplete="off"
        >
          <h1 style={{ marginBottom: 15 }}>Inicio de sesión</h1>
          <div>
            <TextField
              required
              id="outlined-required"
              label="Correo"
              type='email'
              name='email'
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-required-1"
              label="Contraseña"
              type='password'
              name='password'
              onChange={handleChange}
            />
          </div>
          <div style={{ marginTop: 30 }}>
            <Button variant='contained' color='success' onClick={handleSubmit}>Aceptar</Button>
          </div>
        </Box>
        <p style={{ marginTop: 30 }}>¿Aún no tienes una cuenta? <Link to='/register'>Registrate</Link></p>
        <p><Link to='/recovery'>Recuperar contraseña</Link></p>
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

export default Login