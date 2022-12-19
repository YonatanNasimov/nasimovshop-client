import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { mobile } from "../services/responsive"
import { useDispatch, useSelector } from 'react-redux';
import { server_url } from "../services/apiServices";
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../features/userSlice';
import { resetAllItems } from '../features/cartSlice';



const Container = styled.header`
 max-width:100% ;
    min-height:48px ;
    padding:0px 100px ;
    box-shadow: 0px 13px 22px -12px #000000;
    ${mobile({
    padding: "0px"
})}
`
const Wrapper = styled.div`
    padding: 0px 20px ;
    display:flex ;
    justify-content:space-between ;
    align-items:center ;
`
const Left = styled.div`
flex: 1;
display: flex;
align-items:center ;

`

const SearchContainer = styled.div`
border:0.5px solid lightgray ;
margin-left:25px ;
padding: 4px;
display:flex ;
align-items:center ;
${mobile({
    marginLeft: "0px"
})}
`
const Input = styled.input`
border:none ;
${mobile({
    width: "55px"
})}
:focus {
  outline: none;
  box-shadow: none!important;
}
`
const Center = styled.div`
flex: 1;
text-align:center ;
`
const Logo = styled.h1`
font-weight:bold;
${mobile({
    fontSize: "24px",
    marginLeft: "20px"

})}
`
const Right = styled.div`
flex: 1;
display:flex ;
align-items:center ;
justify-content:flex-end ;
${mobile({
    justifyContent: "center",
    flex: "2"
})}
`
const MenuItem = styled.div`
font-size: 14px;
cursor: pointer;
margin-left:24px ;
${mobile({
    fontSize: "8px",
    marginLeft: "10px"
})}
`

const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser)
    const whenLogIn = useSelector(state => state.user.logInTime)
    const quantity = useSelector(state => state.cart.quantity)
    const nav = useNavigate();
    const input = useRef();
    let dt = new Date();
    let time = dt.getTime();

    const onSearch = () => {
        if (input.current.value.length >= 1) {
            nav(`/products/${input.current.value}`)
        }
    }
    const onKeyboardClick = (e) => {
        if (e.key == "Enter") {
            onSearch();
        }
    }

    useEffect(() => {
        onCheck();
    }, [user])


    useEffect(() => {
        autoLogout();
    }, [time])

    const onCheck = () => {
        if (!user) {
            nav("/login")
            //   alert(`hello guest You need to sign first`)
        }
    }



    const autoLogout = () => {
        let thirtyDaysFromLogIn = (whenLogIn + 2592000);
        if (thirtyDaysFromLogIn < time) {
            loginOut();
        }
    }

    const loginOut = () => {
        dispatch(logOut());
        localStorage.clear();
        dispatch(resetAllItems());
    }


    return (
        <Container>
            <Wrapper>
                <Left>
                    <SearchContainer>
                        <Input type="search" ref={input} onKeyDown={onKeyboardClick} placeholder='Search...' />
                        <SearchIcon onClick={onSearch} style={{ color: "grey", fontSize: "16px" }} />
                    </SearchContainer>
                </Left>
                <Center>
                    <Logo onClick={() => nav("/")}>
                        NASIMOV.
                    </Logo>
                </Center>
                <Right>
                    <MenuItem>
                        {user
                            ? <button onClick={() => {
                                window.confirm("are you sure you want to log out your cart will be deleted?") && loginOut();
                            }}>log out</button>
                            : <MenuItem onClick={() => nav("/login")}>Sign in</MenuItem>}
                    </MenuItem>
                    <Link to={"/cart"}>
                        <MenuItem>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlinedIcon color="action" />
                            </Badge>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar