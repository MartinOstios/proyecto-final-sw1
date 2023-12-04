import React, { useState } from 'react'
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Button, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { generate, activate } from '../../../actions/auth';
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router';

const Activate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state.auth.user);
  const [activateBool, setActivateBool] = useState(false);
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSendEmail = async () => {
    const res = await generate({ email: user.email, method: 'email' })
    if (res?.status === 200) {
      enqueueSnackbar(res.message, { variant: 'success' });
      setActivateBool(true)
    } else {
      enqueueSnackbar('Hubo un error al enviar el código', { variant: 'error' });
    }
  }

  const handleSendWhatsapp = async () => {
    const res = await generate({ email: user.email, method: 'whatsapp', phone_number: user.phone_number })
    if (res?.status === 200) {
      enqueueSnackbar(res.message, { variant: 'success' });
      setActivateBool(true);
    } else {
      enqueueSnackbar('Hubo un error al enviar el código', { variant: 'error' });
    }
  }

  const handleChange = (event) => {
    setCode(event.target.value);
  }

  const handleSubmit = async () => {
    const res = await activate({ email: user.email, code: code });
    if (res?.status === 200) {
      enqueueSnackbar(res.message, { variant: 'success' });
      navigate('/login');
    } else {
      enqueueSnackbar('El código ingresado no es correcto', { variant: 'error' });
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>Activar cuenta</h1>
      <p>Selecciona alguna de las siguientes opciones para que te enviemos el código de autenticación</p>
      <div style={{ display: 'flex', gap: 20 }}>
        <Button variant="outlined" startIcon={<EmailIcon />} onClick={handleSendEmail}>
          Correo
        </Button>
        <p>ó</p>
        <Button variant="outlined" startIcon={<WhatsAppIcon />} onClick={handleSendWhatsapp}>
          Whatsapp
        </Button>
      </div>
      {activateBool ?
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15, marginTop: 20 }}>
          <h2 style={{ margin: 0 }}>Ingresa el código</h2>
          <TextField id="outlined-basic" label="Código" variant="outlined" onChange={handleChange} />
          <Button variant='outlined' onClick={handleSubmit}>Aceptar</Button>
        </div>
      : <></>}

    </div>
  )
}

export default Activate