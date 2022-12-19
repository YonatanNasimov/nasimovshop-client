import React from 'react'
import styled from 'styled-components'
import { mobile } from "../services/responsive"

const Message = styled.h2`
font-size:90px ;
font-weight:600 ;
${mobile({
    fontSize:"36px",fontWeight:"200"
})}
`

const NotFound = () => {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "90vh" }}>
            <Message>Page not found, 404 ! !</Message>
        </div>
    )
}

export default NotFound