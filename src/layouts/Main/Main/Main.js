import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../../components/shared/Header/Navbar'

const Main = () => {
  return (
    <div>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default Main