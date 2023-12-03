
import React from 'react'
import '../navbar/Navbar'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { logout } from '../../actions/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'

export const DashboardNavbar = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const closeSession = () => {
        logout(dispatch);
        navigate('/');
        enqueueSnackbar('Cerraste sesión correctamente', { variant: 'info' });
    }

    return (
        <React.Fragment>
            <nav className="navbar" style={{height: '73px'}}>
                <ul>
                    <li>
                        <h2 style={{color: 'white'}}>Dashboard</h2>
                    </li>
                </ul>
                <ul>
                    <div style={{ display: 'flex', gap: 30 }}>
                        <li>
                            <Button variant='text' color='secondary'>
                                <Link to="/" className='navLink'>Inicio</Link>
                            </Button>
                        </li>

                        <li>
                            <Button variant='text' color='secondary'>
                                <Link to="/dashboard/profile" className='navLink'>Perfil</Link>
                            </Button>
                        </li>
                        <li>
                            <Button variant='text' color='secondary' onClick={closeSession}>
                                Cerrar sesión
                            </Button>
                        </li>
                    </div>
                </ul>
            </nav>
        </React.Fragment>
    )
}
