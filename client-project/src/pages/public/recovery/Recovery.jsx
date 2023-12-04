import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'

const Recovery = () => {

  const [email, setEmail] = useState('');

  const handleChange = (event) => {
    setEmail(event.target.value);
  }

  const handleSubmit = () =>{
    console.log(email)
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