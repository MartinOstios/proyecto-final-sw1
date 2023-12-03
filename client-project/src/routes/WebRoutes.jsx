import React from 'react'
import Login from './../pages/public/login/Login'
import Register from './../pages/public/register/Register'
import Recovery from './../pages/public/recovery/Recovery'
import Activate from './../pages/public/activate/Activate'
import { Route } from 'react-router-dom'


const WebRoutes = () => {
    return (
        <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recovery" element={<Recovery />} />
            <Route path="/activate" element={<Activate />} />
        </>
    )
}

export default WebRoutes