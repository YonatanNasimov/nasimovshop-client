import React from "react"
import { Outlet } from "react-router-dom"
import Announcement from "./announcement"
import Footer from "./footer"
import Navbar from "./navbar"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';



const Layout = () => {
    return (
        <React.Fragment>
            <ToastContainer theme="colored" position="top-left"/>
            <Announcement />
            <Navbar />
            <Outlet/>
            <Footer />
        </React.Fragment>
    )
}

export default Layout