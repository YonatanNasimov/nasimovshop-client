import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { mobile } from '../services/responsive'
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { doApiMethod, server_url, userRequest } from '../services/apiServices';
import { Link, useNavigate } from 'react-router-dom';
import { resetAllItems, setOrders } from '../features/cartSlice';

const STRIPE_PUBLIC_KEY = "pk_test_51M6IivLjTCi7TO8ZcK9apuTBKJEMW10xwW8HbaEhyFlhXmP4X0Yw5SCpwSPhDDCUUQKDM9no0jcPvxSmRT8yMGDP00b7S5rno6";

const Container = styled.div`
`
const Wrapper = styled.div`
padding: 20px;
width:80% ;
margin:0 auto ;
${mobile({
    width: "90%",
    padding: "10px"
})}
`
const Title = styled.h1`
font-weight: 300;
text-align:center ;
`
const Top = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 20px;
margin-bottom:12px ;
`
const TopButton = styled.button`
padding: 10px;
font-weight: 600;
margin-left:4px ;
cursor: pointer;
border: ${(props) => props.type === "filled" && "none"};
background: ${(props) => props.type === "filled" ? "black" : "transparent"};
color: ${(props) => props.type === "filled" && "white"};
`
const Bottom = styled.div`
display: flex;
justify-content: space-between;
width:80% ;
margin:0 auto ;
${mobile({
    width: "100%",
    flexDirection: "column"
})}

`
const Info = styled.div`
flex:3 ;
`
const Product = styled.div`
max-width:100% ;
display: flex;
justify-content: space-between;
${mobile({
    flexDirection: "column"
})}
 `
const ProductDetails = styled.div`
flex:2 ;
display: flex;
 `
const Image = styled.img`
width:200px ;
${mobile({
    maxWidth: "50%",

})}
 `
const Details = styled.div`
padding: 20px;
display: flex;
flex-direction:column ;
${mobile({
    marginLeft: "8px",
    padding: "8px 0px",
    maxWidth: "100%",
    justifyContent: "space-around"
})}

 `
const ProductName = styled.div`
 `
const ProductId = styled.span`
 `
const ProductColor = styled.div`
width: 20px;
height: 20px;
border-radius:50% ;
border:1px solid black;
background:${(props) => props.color} ;
 `
const ProductSize = styled.span`
 `
const PriceDetails = styled.span`
flex:1 ;
display: flex;
flex-direction:column ;
justify-content: center;
align-items: center;
 `
const ProductAmountContainer = styled.div`
display: flex;
align-items: center;
margin-bottom:20px;
`
const ProductAmount = styled.div`
font-size:24px ;
padding:4px ;
margin: 4px;
border:1px solid black ;
border-radius:8px ;
${mobile({
    margin: "5px 15px",

})}
`
const ProductPrice = styled.div`
font-size:30px ;
font-weight:200 ;
${mobile({
    marginBottom: "16px",
    textAlign: "center"
})}
`
const Hr = styled.hr`
background:#bebebe ;
border:none;
height:2px ;
`

const Summary = styled.div`
word-wrap: break-word;
overflow-wrap: break-word;
max-height:100% ;
margin-left:12px ;
flex:1 ;
border:1px solid lightgray ;
border-radius:8px ;
padding: 20px;
height:50vh ;
${mobile({
    maxWidth: "95%",
    margin: "0px auto"
})}
`
const SummaryTitle = styled.h1`
font-weight:200 ;
`
const SummaryItem = styled.div`
margin: 30px 0px;
display: flex;
justify-content: space-between; 
font-weight:${props => props.type === 'total' && "500"} ;
font-size:${props => props.type === 'total' && "24px"} ;
`
const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``

const Button = styled.button`
width: 100%;
padding:8px ;
background:black ;
color:white;
cursor: pointer;
font-weight:600 ;
`

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    let products = cart.products;
    const nav = useNavigate();

    const [stripeToken, setStripeToken] = useState("");
    const onToken = (token) => {
        setStripeToken(token)
    }

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post("/stripe/payment", {
                    tokenId: stripeToken.id,
                    amount: cart.total * 100,
                });
                let data = { stripeData: res.data, products: cart, }
                console.log(data)
                dispatch(setOrders({ data }))
                nav("/success")
                dispatch(resetAllItems());
            } catch (err) {
                console.log(err)
            }
        };
        stripeToken && makeRequest();
    }, [stripeToken, cart.total, nav])

    return (

        <Container>
            <Wrapper>
                <Title>YOUR BAG.</Title>
                <Top>
                    <TopButton type='filled' onClick={() => {
                        if(cart.products.length > 0){
                            window.confirm("are you sure you want to delete all?") && dispatch(resetAllItems());
                        }
                    }} className='btn btn-danger mt-3'>Reset all</TopButton>
                        <TopButton onClick={() => nav(-1)}>CONTINUE SHOPING</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {products.map((product) => {
                            return (
                                <React.Fragment key={product._id}>
                                    <Product>
                                        <ProductDetails>
                                            <Image alt='clothing' src={product.img_url} />
                                            <Details>
                                                <ProductName><b>Product:</b>{product.title}</ProductName>
                                                <ProductId><b>ID:</b>{product._id}</ProductId>
                                                <ProductColor color={product.color} />
                                                <ProductSize><b>Size:</b>{product.size}</ProductSize>
                                            </Details>
                                        </ProductDetails>
                                        <PriceDetails>
                                            <ProductAmountContainer>
                                                <AddIcon />
                                                <ProductAmount>{product.quantity}</ProductAmount>
                                                <RemoveIcon />
                                            </ProductAmountContainer>
                                            <ProductPrice>{product.price * product.quantity}</ProductPrice>
                                        </PriceDetails>
                                    </Product>
                                    <Hr />
                                </React.Fragment>
                            )
                        })}
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>SubTotal: </SummaryItemText>
                            <SummaryItemPrice>{cart.total} USD</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping: </SummaryItemText>
                            <SummaryItemPrice>5.95 USD</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount: </SummaryItemText>
                            <SummaryItemPrice>-5.95 USD</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText >Total: </SummaryItemText>
                            <SummaryItemPrice>{cart.total} USD</SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout
                            name="Nasimov Shop"
                            image="https://images.pexels.com/photos/430205/pexels-photo-430205.jpeg?auto=compress&cs=tinysrgb&w=600"
                            billingAddress
                            shippingAddress
                            description={`Your total is $${cart.total}`}
                            amount={cart.total * 100}
                            token={onToken}
                            stripeKey={STRIPE_PUBLIC_KEY}
                        >
                            <Button>CHECKOUT NOW</Button>
                        </StripeCheckout>
                    </Summary>
                </Bottom>
            </Wrapper>
        </Container>
    )
}

export default Cart