import React from 'react'
import { useSelector } from 'react-redux'

const First = () => {
  const authUser = useSelector((state) => state.auth.user);
  return (
    <>
        <h1>¡Bienvenido! {authUser.name}</h1>
    </>


  )
}

export default First