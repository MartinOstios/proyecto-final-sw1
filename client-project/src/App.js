import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard'
import First from './pages/dashboard/first/First'
import User from './pages/dashboard/users/User'
import Product from './pages/dashboard/products/Product'
import Role from './pages/dashboard/roles/Role'
import Category from './pages/dashboard/categories/Category'
import Headquarter from './pages/dashboard/headquarters/Headquarter'
import Client from './pages/dashboard/clients/Client'
import Report from './pages/dashboard/reports/Report'
import Profile from './pages/dashboard/profile/Profile'
import Provider from './pages/dashboard/providers/Provider'

import Index from './pages/public/landing/Index'
import Layout from './pages/public/Layout'

import { SnackbarProvider } from 'notistack';
import { useDispatch, useSelector } from 'react-redux'

import { authenticateUser } from './actions/auth'

import Login from './pages/public/login/Login'
import Register from './pages/public/register/Register'
import Recovery from './pages/public/recovery/Recovery'
import Activate from './pages/public/activate/Activate'
import { Backdrop, CircularProgress } from '@mui/material'






const App = () => {


  const token = localStorage.getItem("access");
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.is_authenticated);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  console.log(isAuthenticated);

  useEffect(() => {
    const handleLoggedIn = async () => {
      if (token && !isLoggedIn) {
        const response = await authenticateUser(dispatch);
        if (response) {
          setIsLoggedIn(true);
        }
      }

      if (!token) {
        setIsLoggedIn(false);
      }

      setIsLoading(false);
    }
    handleLoggedIn();
  }, [dispatch, token, isLoggedIn, user]);
  console.log(user?.role?.name);

  if (isLoading) {
    return (
      <div>
        <Backdrop
          sx={{ color: '#fff', zIndex: 10 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    )
  }


  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="*" element={<Navigate to="/" />} />
              {!isAuthenticated &&
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/recovery" element={<Recovery />} />
                  <Route path="/activate" element={<Activate />} />
                </>
              }


            </Route>
            {isAuthenticated && user.active &&
              <>
                <Route path="/dashboard" element={<Dashboard />}>
                  <Route index element={<First />} />
                  <Route path="/dashboard/profile" element={<Profile />} />
                  {user.role.name === 'Administrador' ?
                    <>
                      <Route path="/dashboard/users" element={<User />} />
                      <Route path="/dashboard/categories" element={<Category />} />
                      <Route path="/dashboard/products" element={<Product />} />
                      <Route path="/dashboard/headquarters" element={<Headquarter />} />
                      <Route path="/dashboard/clients" element={<Client />} />
                      <Route path="/dashboard/roles" element={<Role />} />
                      <Route path="/dashboard/reports" element={<Report />} />
                      <Route path="/dashboard/providers" element={<Provider />} />
                    </>
                    : <></>}


                </Route>
              </>
            }
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </>
  )
}

export default App
