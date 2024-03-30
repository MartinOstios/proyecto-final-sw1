import * as React from 'react';
import { useState } from 'react';
import './LandingMessage.scss';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

import { useSnackbar } from 'notistack'

export const LandingMessage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState('');
    const [phone_number, setPhone] = useState('');
    const [acceptPolicy, setAcceptPolicy] = useState(false);
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true); // Variable para validar el número de teléfono
    const [isEmailValid, setIsEmailValid] = useState(true); // Variable para validar el correo electrónico
    const [isDataValid, setIsDataValid] = useState(true);

    const handleOpenModal = () => {
        setOpenModal(true);
        setIsEmailValid(true);
        setIsPhoneNumberValid(true);
        setIsDataValid(true);
        setEmail('');
        setPhone('');
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setIsEmailValid(true); // Reiniciar la validación del correo
    };

    const handleAccept = async () => {
        if (acceptPolicy) {
            // Validar el correo electrónico
            const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
            const isEmailValid = email === '' || emailRegex.test(email);
            let emailValid = true;
            let phoneValid = true;
            const dataToSend = {};
            if (email) {
                if (isEmailValid) {
                    dataToSend.email = email;
                } else {
                    setIsEmailValid(false);
                    emailValid = false;
                }
            }

            if (phone_number) {
                if (phone_number.match(/^3[0-9]{9}$/)) {
                    dataToSend.phone_number = phone_number;
                } else {
                    setIsPhoneNumberValid(false);
                    phoneValid = false;
                }
            }

            if (Object.keys(dataToSend).length > 0 && emailValid && phoneValid) {
                // Enviar los datos al backend para guardar en la base de datos

                console.log('Enviar datos al backend: ' + dataToSend);
                enqueueSnackbar(`¡Te suscribiste correctamente!`, { variant: 'success' });
                setOpenModal(false);
            } else {
                if (!email && !phone_number) {
                    setIsDataValid(false);
                }
            }
        }
    };



    return (
        <React.Fragment>
            <div className='main-card'>
                <div className="window">
                    <p className="parrafo">
                        Desde las montañas de Manizales hasta tu guardarropa, te invitamos a descubrir la magia de los textiles colombianos y a unirte a nuestra misión de vestir de manera consciente y respetuosa con nuestro planeta.
                    </p>
                    <Button variant='contained' color='primary' className='button-window' onClick={handleOpenModal}>SUSCRIBETE</Button>
                    <span>Para recibir notificaciones de descuentos o promociones.</span>
                </div>
            </div>
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Suscripción</DialogTitle>
                <DialogContent>
                    <div style={{ marginBottom: '16px', marginTop: '10px' }}>
                        <TextField
                            label="Email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ marginBottom: '2px' }}
                        />
                        {!isEmailValid ? (
                            <Typography variant="body2" color="error">
                                Correo electrónico inválido.
                            </Typography>
                        ) : null}
                    </div>

                    <div style={{ marginBottom: '16px', marginTop: '10px' }}>
                        <TextField
                            label="Teléfono"
                            fullWidth
                            value={phone_number}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{ marginBottom: '2px' }}
                        />
                        {isPhoneNumberValid ? null : (
                            <Typography variant="body2" color="error">
                                Número de teléfono inválido. Debe comenzar con '3' y tener 10 dígitos.
                            </Typography>
                        )}
                    </div>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={acceptPolicy}
                                onChange={(e) => setAcceptPolicy(e.target.checked)}
                            />
                        }
                        label="Aceptar políticas de tratamiento de datos"
                    />

                    {!isDataValid ? (
                        <Typography variant="body2" color="error" style={{ margin: '5px' }}>
                            Debe ingresar el correo o un número de teléfono.
                        </Typography>
                    ) : null}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleAccept}
                        color="primary"
                        disabled={!acceptPolicy}
                    >
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
