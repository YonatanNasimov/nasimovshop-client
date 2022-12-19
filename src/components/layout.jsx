import React from "react"
import { Outlet } from "react-router-dom"
import Announcement from "./announcement"
import Footer from "./footer"
import Navbar from "./navbar"


const Layout = () => {
    return (
        <React.Fragment>
            <Announcement />
            <Navbar />
            <Outlet/>
            <Footer />
        </React.Fragment>
    )
}

export default Layout