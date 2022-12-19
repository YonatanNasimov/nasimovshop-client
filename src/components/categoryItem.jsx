import { Link } from 'react-router-dom'
import styled from 'styled-components'


const Container = styled.div`
    flex:1 ;
    margin: 3px;
    height: 70vh;
    max-width:100% ;
    position:relative ;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit:cover ;
    `

const Info = styled.div`
    position:absolute ;
    top:0 ;
    left:0 ;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction:column ;
    align-items: center;
    justify-content: center;
    `
const Title = styled.h1`
    color:white ;
    margin-bottom:20px ;
`
const Button = styled.button`
    border:none ;
    cursor: pointer;
    padding: 10px;
    background:white ;
    color:grey ;
    font-weight: 600;
`



const CategoryItem = (props) => {
    const item = props.item
    return (
        <Container>
            <Link to={`/products/${item.cat}`}>
                <Image alt={"image of " + item.title} src={item.img} />
                <Info>
                    <Title>{item.title}</Title>
                    <Button>SHOP NOW</Button>
                </Info>
            </Link>
        </Container>
    )
}

export default CategoryItem