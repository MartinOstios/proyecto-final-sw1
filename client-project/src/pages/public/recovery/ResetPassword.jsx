import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { resetPassword } from '../../../actions/auth';
import { useNavigate } from 'react-router-dom';
const ResetPassword = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const [formData, setFormData] = useState({
        password: '',
        password_repeat: ''
    })

    const handleChange = (event) => {
        setFormData(FormData => ({ ...FormData, [event.target.name]: event.target.value }))
    };

    const handleSubmit = async () => {
        console.log(formData);
        if (formData.password !== formData.password_repeat) {
            enqueueSnackbar('Las contraseñas no son iguales', { variant: 'error' });
            return;
        }

        const res = await resetPassword({ id: params.id, password: formData.password })
        if (res?.status === 200) {
            enqueueSnackbar(res.message, { variant: 'success' });
            navigate('/login');
        } else {
            enqueueSnackbar('Hubo un error', { variant: 'error' });
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1>Reiniciar contraseña</h1>
            <TextField id="outlined-basic" label="Contraseña" variant="outlined" style={{ marginTop: 10 }} name='password' type='password' onChange={handleChange} />
            <TextField id="outlined-basic" label="Repita la contraseña" variant="outlined" style={{ marginTop: 10 }} name='password_repeat' type='password' onChange={handleChange} />
            <Button variant='outlined' style={{ marginTop: 20 }} onClick={handleSubmit}>Aceptar</Button>

        </div>
    )
}

export default ResetPassword