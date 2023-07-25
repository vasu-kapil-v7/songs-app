import React from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import AppBarComponent from '../AppBar';

const HeaderLayout = () => {
    const navigate = useNavigate();
  return (
    <>
    <AppBarComponent />
    <Outlet />
  </>
  )
}

export default HeaderLayout