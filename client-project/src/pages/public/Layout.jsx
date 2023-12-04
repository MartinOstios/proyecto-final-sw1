import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Navbar/>
      <div style={{minHeight: '100vh', backgroundColor: '#FBF6EA'}}>
        <Outlet/>
      </div>
      
      <Footer/>
    </>
  )
}

export default Layout