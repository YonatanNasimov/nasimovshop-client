import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { mobile } from '../services/responsive';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doApiGet, server_url } from '../services/apiServices';
import { useDispatch } from 'react-redux';
import { addProduct } from '../features/cartSlice';
import CircularIndeterminate from '../components/loading';
import { toast } from 'react-toastify';


const Container = styled.div`
max-width:100% ;
overflow-x:hidden ;
`

const Wrapper = styled.div`
width:80% ;
margin:0 auto ;
padding: 50px;
display: flex;
${mobile({
    maxWidth: "90%",
    padding: "8px",
    flexDirection: "column"
})}
`
const ImageContainer = styled.div`
flex:1 ;
display: flex;
align-items: center;
justify-content: center;

`
const Image = styled.img`
max-width:100% ;
height:90vh ;
object-fit:cover ;
${mobile({
    height: "40vh",
})}
`
const InfoContainer = styled.div`
flex:1 ;
padding:0px 50px;
${mobile({
    padding: "0px 8px",
})}
`
const Title = styled.h1`
font-weight:100 ;

`
const Desc = styled.p`
margin:20px 0px ;
`
const Price = styled.span`
font-weight: 100;
color:grey ;
font-size: 30px;
`
const FilterContainer = styled.div`
display: flex;
margin:30px 0px;
width:50% ;
justify-content: space-between;
${mobile({
    width: "100%"
})}
`
const Filter = styled.div`
display: flex;
align-items: center;
`
const FilterText = styled.span`
font-size: 20px;
font-weight:200 ;
`
const FilterColor = styled.span`
width: 20px;
height:20px ;
border-radius:50% ;
border:1px solid black;
background:${props => props.color} ;
margin:0 4px ;
cursor: pointer;
`
const Select = styled.select`
margin-right:10px ;
padding:8px ;
`
const Option = styled.option`

`
const AddContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width:50% ;
${mobile({
    width: "100%"
})}
`
const AmountContainer = styled.div`
display: flex;
align-items: center;
font-weight:700 ;
`
const Amount = styled.span`
width:30px ;
height:30px ;
border-radius:10px;
border:1px solid teal ;
display: flex;
align-items: center;
justify-content: center;
margin: 0px 4px ;
`
const Button = styled.button`
padding: 8px;
border:2px solid teal ;
background:white ;
cursor: pointer;
font-weight: 400;
&:hover{
    background:#f8f4f4 ;
}
`
const ProductItem = () => {
    const params = useParams();
    const id = params["id"];

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        getProduct();
    }, [id]);

    const getProduct = async () => {
        let url = server_url + "/Products/" + id
        try {
            let resp = await doApiGet(url);
            let item = resp.data[0]
            setProduct(item);
        }
        catch (err) {
            console.log(err.response);
            toast.error("There problem try come back later")
        }
    }

    const onQuantity = (type) => {
        if (type === "minus") {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };

    const onCartClick = () => {
        dispatch(
            addProduct({ ...product, quantity, color, size })
        );
    };


    return (
        <Container style={{ maxWidth: "100%" }}>
            {product.img_url ?
                <Wrapper>
                    <ImageContainer>
                        <Image alt='clothing' src={product.img_url} />
                    </ImageContainer>
                    <InfoContainer>
                        <Title>{product.title}</Title>
                        <Desc>{product.desc}</Desc>
                        <Price>{product.price} $</Price>
                        <FilterContainer>
                            <Filter>
                                <FilterText>Color:</FilterText>
                                {product.color?.map((c) => {
                                    return (
                                        <FilterColor key={c} color={c} onClick={() => setColor(c)}></FilterColor>
                                    )
                                })}
                            </Filter>
                            <Filter>
                                <Select onChange={(e) => setSize(e.target.value)}>
                                    {product.size?.map((s) => {
                                        return (
                                            <Option key={s}>{s}</Option>
                                        )
                                    })}
                                </Select>
                            </Filter>
                        </FilterContainer>
                        <AddContainer>
                            <AmountContainer >
                                <RemoveIcon onClick={() => onQuantity("minus")} style={{ cursor: "pointer" }} />
                                <Amount>{quantity}</Amount>
                                <AddIcon onClick={() => onQuantity("plus")} style={{ cursor: "pointer" }} />
                            </AmountContainer>
                            <Button onClick={onCartClick}>Add To Cart</Button>
                        </AddContainer>
                    </InfoContainer>
                </Wrapper>
                : 
                <div  style={{
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <CircularIndeterminate/>
                </div>}
        </Container>
    )
}

export default ProductItem