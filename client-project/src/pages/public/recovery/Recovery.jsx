import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { sendRecovery } from '../../../actions/auth';
import { useSnackbar } from 'notistack'

const Recovery = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');

  const handleChange = (event) => {
    setEmail(event.target.value);
  }

  const handleSubmit = async () =>{
    const res = await sendRecovery({email: email});
    if (res?.status === 200) {
      enqueueSnackbar(res.message, { variant: 'success' });
    } else {
      enqueueSnackbar('Hubo un error al enviar el correo', { variant: 'error' });
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>Recuperar contraseña</h1>
      <p>Ingresa tu correo para enviarte las instrucciones de recuperación</p>
      <TextField id="outlined-basic" label="Correo" variant="outlined" style={{marginTop: 10}} onChange={handleChange} />
      <Button variant='outlined' style={{marginTop: 20}} onClick={handleSubmit}>Aceptar</Button>
    </div>
  )
}

export default Recovery