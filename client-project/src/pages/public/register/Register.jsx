import { Box, TextField, Button, Backdrop, CircularProgress, Checkbox } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { register } from '../../../actions/auth'

import { useSnackbar } from 'notistack'
import ModalGenerico from '../../../components/modal/ModalGenerico';
const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    name: '',
    lastname: '',
    email: '',
    phone_number: '',
    password: '',
    policies: false
  });

  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = (state) => {
    setOpen(state);
  }


  const handleSubmit = async () => {
    if (!registerData.policies){
      enqueueSnackbar('Debe aceptar los términos y condiciones', { variant: 'error'});
      return;
    }

    setOpenBackdrop(true);
    const res = await register(registerData, dispatch);
    console.log(res);
    if(res && res.user) {
      enqueueSnackbar(res.message, { variant: 'success' });

      navigate('/activate');
    } else {
      enqueueSnackbar(`Error: ${res?.message}`, { variant: 'error' });
    }
    setOpenBackdrop(false);
  };

  const handleChange = (event) => {
    setRegisterData(registerData => ({ ...registerData, [event.target.name]: event.target.value }))
  };

  const handlePolities = (event) => {
    registerData['policies'] = event.target.checked;
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
          <h1 style={{ marginBottom: 15 }}>Registro</h1>
          <div>
            <TextField
              required
              id="outlined-required"
              label="Nombre"
              type='text'
              name='name'
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-required"
              label="Apellido"
              type='text'
              name='lastname'
              onChange={handleChange}
            />
          </div>
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
              id="outlined-required"
              label="Número de celular"
              type='text'
              name='phone_number'
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
          <div>
            <Checkbox onChange={handlePolities} />
            <Button onClick={() => handleOpen(true)}>Términos y Condiciones</Button>
          </div>
          <div style={{ marginTop: 30 }}>
            <Button variant='contained' color='success' onClick={handleSubmit} >Aceptar</Button>
          </div>
        </Box>
        <p style={{ marginTop: 30 }}>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
      </div>

      <Backdrop
        sx={{ color: '#fff', zIndex: 10 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ModalGenerico open={open} handleOpen={handleOpen}>
        <div> <b>  Términos y Condiciones </b></div>
        <div>
          Por favor, lee detenidamente los siguientes términos y condiciones antes de utilizar nuestro sitio web. Al acceder y utilizar este sitio web, aceptas cumplir con estos términos y condiciones. Si no estás de acuerdo con alguno de los siguientes puntos, te recomendamos que no utilices nuestro sitio web.
          <hr /><br />
          1. Uso del Sitio Web
          <br />
          1.1.
          <br />
          El contenido de este sitio web es únicamente para información general y puede estar sujeto a cambios sin previo aviso. No garantizamos la exactitud, integridad o actualidad de la información proporcionada en este sitio web.
          <br />
          1.2.
          <br />
          El uso de cualquier información o material en este sitio web es bajo tu propio riesgo. Es tu responsabilidad asegurarte de que cualquier producto, servicio o información disponible a través de este sitio web cumpla con tus requisitos específicos.
          <br />
          1.3.
          <br />
          Este sitio web puede contener enlaces a otros sitios web que no están bajo nuestro control. No tenemos control sobre la naturaleza, el contenido y la disponibilidad de esos sitios. La inclusión de cualquier enlace no implica necesariamente una recomendación o respaldo de los puntos de vista expresados en ellos.
          <hr /><br />
          2. Propiedad Intelectual
          <br />
          2.1.
          <br />
          Todos los derechos de propiedad intelectual en relación con este sitio web y su contenido (incluyendo, pero no limitado a, texto, gráficos, logotipos, imágenes y software) son propiedad de NUESTRA PÁGINA o de nuestros licenciantes. Estos están protegidos por las leyes de propiedad intelectual aplicables.
          <br />
          2.2.
          <br />
          Está prohibida cualquier reproducción, distribución, modificación o uso no autorizado del contenido de este sitio web sin nuestro consentimiento previo por escrito.
          <hr /><br />
          3. Privacidad y Protección de Datos
          <br />
          3.1.
          <br />
          La recopilación y el uso de tus datos personales en relación con este sitio web están sujetos a nuestra Política de Privacidad. Al utilizar nuestro sitio web, aceptas el procesamiento de tus datos personales de acuerdo con nuestra Política de Privacidad.
          <hr /><br />
          4. Limitación de Responsabilidad
          <br />
          4.1.
          <br />
          En la medida permitida por la ley aplicable, excluimos todas las garantías y condiciones relacionadas con nuestro sitio web y su contenido. No seremos responsables de ningún daño directo, indirecto, incidental, especial o consecuente que surja del uso de este sitio web.
          <hr /><br />
          5. Modificaciones de los Términos y Condiciones
          <br />
          5.1.
          <br />
          Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Los cambios serán efectivos tan pronto como se publiquen en este sitio web. Te recomendamos que revises regularmente estos términos y condiciones para estar al tanto de cualquier cambio.
        </div>
      </ModalGenerico>
    </div>
  )
}

export default Register