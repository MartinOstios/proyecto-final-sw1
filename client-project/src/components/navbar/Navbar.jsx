import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss';
import images from '../../assets/images';
import { Button } from '@mui/material';

const Navbar = () => {
  return (
    <React.Fragment>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">
              <img src={images.logoFooter} alt="" />
            </Link>
          </li>
          <li>
            <Button variant='text' color='secondary'>
              <Link to="/" className='navLink'>Inicio</Link>
            </Button>
          </li>
        </ul>
        <ul>
          <div style={{ display: 'flex', gap: 30 }}>
            <li>
              <Button variant='text' color='secondary'>
                <Link to="/register" className='navLink'>Registro</Link>
              </Button>
            </li>

            <li>
              <Button variant='text' color='secondary'>
                <Link to="/login" className='navLink'>Login</Link>
              </Button>
            </li>
          </div>
          <li style={{ display: 'flex', gap: 30 }}>
            <Button variant='text' color='secondary'>
              <Link to="/dashboard" className='navLink'>Dashboard</Link>
            </Button>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  )
}

export default Navbar