import styled from 'styled-components'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Info = styled.div`
    opacity:0 ;
    width: 100%;
    height: 100%;
    position:absolute ;
    top:1 ;
    left:1 ;
    background:rgba(0,0,0,0.3) ;
    z-index:3 ;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:all 0.5s ease;
    cursor: pointer;
`
const Container = styled.div`
 max-width:100% ;
    flex:1 ;
    margin: 5px;
    min-width:300px ;
    height:350px ;
    display: flex;
    align-items: center;
    justify-content: center;
    background:#f5fbfd ;
    position:relative ;

    &:hover ${Info}{
        opacity:1 ;
    }
`
const Circle = styled.div`
width: 200px;
height: 200px;
border-radius:50% ;
background:white ;
position:absolute ;
`
const Image = styled.img`
height:75% ;
z-index:2 ;
`
const Icon = styled.div`
width: 40px;
height: 40px;
border-radius:50% ;
background:white ;
display: flex;
align-items: center;
justify-content: center;
margin: 10px;
transition:all 0.5s ease;

 &:hover{
    background:#e9f5f5 ;
    transform: scale(1.1) ;
 }
`

const Product = (props) => {
    const item = props.item
    const nav = useNavigate();
    return (
        <React.Fragment>
            {item._id ?
                <Container>
                    <Circle />
                    <Image src={item.img_url} />
                    <Info>
                        <Icon onClick={() => nav("/cart")}>
                            <ShoppingCartOutlinedIcon />
                        </Icon>
                        <Icon>
                            <Link to={`/Product/${item._id}`}>
                                <SearchOutlinedIcon />
                            </Link>
                        </Icon>
                        {/* <Icon>
                            <FavoriteBorderOutlinedIcon />
                        </Icon> */}
                    </Info>

                </Container>
                : <h3 style={{ textAlign: "center", margin: "20px 0px" }}>Loading...</h3>}
        </React.Fragment>
    )
}

export default Product