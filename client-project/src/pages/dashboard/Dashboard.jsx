import React from 'react'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <>
      <h1>Sidebar</h1>
      <h1>Header</h1>
      <Outlet/>
    </>
  )
}

export default Dashboard