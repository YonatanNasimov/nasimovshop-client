import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './adminComps/sidebar/Sidebar'
import Topbar from './adminComps/topbar/Topbar'

const LayoutAdmin = () => {
  return (
    <React.Fragment>
      <Topbar />
      <div style={{ display: "flex", margin: "10px" }} className="container">
        <Sidebar />
        <Outlet />
      </div>
    </React.Fragment>
  )
}

export default LayoutAdmin