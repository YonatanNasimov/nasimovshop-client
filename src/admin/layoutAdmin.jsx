import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './adminComps/sidebar/Sidebar'
import Topbar from './adminComps/topbar/Topbar'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const LayoutAdmin = () => {
  return (
    <React.Fragment>
      <ToastContainer theme="colored" position="top-left" />
      <Topbar />
      <div style={{ display: "flex", margin: "10px" }} className="container">
        <Sidebar />
        <Outlet />
      </div>
    </React.Fragment>
  )
}

export default LayoutAdmin