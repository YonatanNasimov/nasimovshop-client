import styled from 'styled-components'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { useState } from 'react';
import { sliderItems } from '../services/data';
import { mobile } from '../services/responsive';

const Container = styled.div`
 max-width:100% ;
    width:100%;
    height:100vh ;
    display:flex ;
    position:relative ;
    overflow-x:hidden ;
    overflow:hidden ;
    ${mobile({
    display: "none"
})}
`
const Arrow = styled.div`
width: 50px;
height: 50px;
background: #fff7f7 ;
border-radius:50% ;
display: flex;
justify-content: center;
align-items: center;
position: absolute; 
top:0 ;
bottom: 0 ;
left: ${props => props.direction === "left" && "10px"} ;
right: ${props => props.direction === "right" && "10px"} ;
margin:auto ;
cursor: pointer;
opacity:0.5;
z-index:2 ;
transition:all 0.5s ease;

&:hover{
    background:#e9f5f5 ;
    transform: scale(1.1) ;
 }
`
const Warpper = styled.div`
transform:translateX(${props => props.slideIndex * -100}vw) ;
height: 100%;
display: flex;
transition:all 1.5s ease ;
`
const Slide = styled.div`
width:100vw ;
height:100vh ;
display: flex;
align-items: center;
background:#${props => props.bg} ;
`
const ImgContainer = styled.div`
flex:1 ;
height:100% ;
`
const Image = styled.img`
height:100% ;

`
const InfoContainer = styled.div`
flex:1 ;
padding:50px;
`
const Title = styled.h1`
font-size: 60px;
`
const Desc = styled.p`
margin:50px 0px;
font-size: 20px;
font-weight:bold ;
letter-spacing:3px ;
`
const Button = styled.button`
padding:10px ;
font-size: 20px;
background:transparent ;
cursor: pointer;

`

const Slider = () => {

    const [slideIndex, setSlideIndex] = useState(0);

    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
        }
        else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
        }
    }

    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowBackIosNewOutlinedIcon />
            </Arrow>
            <Warpper slideIndex={slideIndex}>
                {sliderItems.map((item) => {
                    return (
                        <Slide key={item.id} bg={item.bg}>
                            <ImgContainer>
                                <Image alt={"image of " + item.title} src={item.img} />
                            </ImgContainer>
                            <InfoContainer>
                                <Title>{item.title}</Title>
                                <Desc>{item.desc}</Desc>
                            </InfoContainer>
                        </Slide>
                    )
                })}
            </Warpper>
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <ArrowForwardIosOutlinedIcon />
            </Arrow>

        </Container>
    )
}

export default Slider