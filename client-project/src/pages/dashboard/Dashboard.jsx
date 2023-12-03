import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import ListItemIcon from '@mui/material/ListItemIcon';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CategoryIcon from '@mui/icons-material/Category';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';

import Toolbar from '@mui/material/Toolbar';
import { DashboardNavbar } from '../../components/dashboardNavbar/DashboardNavbar';
import { useSelector } from 'react-redux';
const drawerWidth = 240;

const Dashboard = () => {
  const authUser = useSelector((state) => state.auth.user);
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar >
            <div style={{ width: '30%', marginTop: 10 }}>
              <img src={authUser?.avatarClient} alt="" style={{ width: '50px', height: '50px', borderRadius: '50%'}} />
            </div>
            <div style={{ marginLeft: 10, display: 'flex', flexDirection: 'column' }}>
              <p style={{ fontSize: 20, margin: 0 }}><b>{authUser?.name}</b></p>
              <span style={{ fontSize: 15 }}>{authUser?.role?.name}</span>
            </div>

          </Toolbar>
          <Divider />
          <List>

            <ListItem key='Usuarios' disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <Link to={'/dashboard/users'} style={{ textDecoration: 'none', color: 'black' }}>Usuarios</Link>
              </ListItemButton>
            </ListItem>
            <ListItem key='Productos' disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ShoppingBagIcon />
                </ListItemIcon>
                <Link to={'/dashboard/products'} style={{ textDecoration: 'none', color: 'black' }}>Productos</Link>
              </ListItemButton>
            </ListItem>

            <ListItem key='Categorias' disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <Link to={'/dashboard/categories'} style={{ textDecoration: 'none', color: 'black' }}>Categorías</Link>
              </ListItemButton>
            </ListItem>
            <ListItem key='Sedes' disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <MapsHomeWorkIcon />
                </ListItemIcon>
                <Link to={'/dashboard/headquarters'} style={{ textDecoration: 'none', color: 'black' }}>Sedes</Link>
              </ListItemButton>
            </ListItem>
            <ListItem key='Clientes' disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PermContactCalendarIcon />
                </ListItemIcon>
                <Link to={'/dashboard/clients'} style={{ textDecoration: 'none', color: 'black' }}>Clientes</Link>
              </ListItemButton>
            </ListItem>
            <ListItem key='Proveedores' disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AirportShuttleIcon />
                </ListItemIcon>
                <Link to={'/dashboard/providers'} style={{ textDecoration: 'none', color: 'black' }}>Proveedores</Link>
              </ListItemButton>
            </ListItem>

          </List>
          <Divider />
          <List>
            <ListItem key='Roles' disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AutoFixHighIcon />
                </ListItemIcon>
                <Link to={'/dashboard/roles'} style={{ textDecoration: 'none', color: 'black' }}>Roles</Link>
              </ListItemButton>
            </ListItem>

            <ListItem key='Reportes' disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ImportContactsIcon />
                </ListItemIcon>
                <Link to={'/dashboard/reports'} style={{ textDecoration: 'none', color: 'black' }}>Reportes</Link>
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: '#FFEFE1' }}
        >
          <DashboardNavbar />
          <div style={{ width: '100%', display: 'flex', alignItems: 'top', justifyContent: 'center', height: "calc(100vh - 73px)" }}>
            <Outlet />
          </div>
        </Box>
      </Box>
    </>
  )
}

export default Dashboard