import { AddIcCall, AttachEmail } from '@mui/icons-material'
import React from 'react'
import images from '../../assets/images'
import './Footer.scss'

const Footer = () => {
  return (
    <React.Fragment>
      <footer>
        <div className="footer-container">
          <div className="contacto">
            <h3>CONTACTO</h3>
            <div className="contacto-item">
              <AddIcCall />
              <span>+57 3121231234</span>
            </div>
            <div className="contacto-item">
              <AttachEmail />
              <span>info@empresa.com</span>
            </div>
          </div>

          <div className="direccion">
            <h3>DIRECCIÓN</h3>
            <div className="direccion-item">
              <span>Calle 32 N 14-103</span>
            </div>
            <div className="direccion-item">
              <span>Manizales, Caldas, Colombia.</span>
            </div>
            <div className="direccion-item">
              <span>Horario de atención:</span>
            </div>
            <div className="direccion-item">
              <span>Lunes a viernes de 8:00 am a 5:00 pm</span>
            </div>
          </div>

          <div className="politicas" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3>POLÍTICAS DE PRIVACIDAD</h3>
            <img src={images.logoFooter} style={{ width: '150px', marginTop: 5 }} alt="Logo UAM" />
          </div>
        </div>
      </footer>
    </React.Fragment>
  )
}

export default Footer