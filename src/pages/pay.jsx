import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";

const KEY = "pk_test_51M6IivLjTCi7TO8ZcK9apuTBKJEMW10xwW8HbaEhyFlhXmP4X0Yw5SCpwSPhDDCUUQKDM9no0jcPvxSmRT8yMGDP00b7S5rno6"

const Pay = () => {
    const nav = useNavigate();
    const [stripeToken, setStripeToken] = useState(null)

    const onToken = (token) => {
        setStripeToken(token)
    }
    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await axios.post(
                    "http://localhost:5000/stripe/payment",
                    {
                        tokenId:stripeToken.id,
                        amount:2000,
                    }
                );
                console.log(res.data)
                nav("/success")
            } catch (err) {
                alert(err)
                console.log(err)
            }
        };
        stripeToken && makeRequest();
    }, [stripeToken])
    return (
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh"}}>
            <StripeCheckout
                name='Nasimov Shop'
                image='https://images.pexels.com/photos/2235130/pexels-photo-2235130.jpeg?auto=compress&cs=tinysrgb&w=600'
                billingAddress
                shippingAddress
                description='your total is 20$'
                amount={2000}
                token={onToken}
                stripeKey={KEY}
            >
                <button style={{width:"120px",fontWeight:"600",background:"black",padding:"20px",color:"white",borderRadius:"4px",cursor:"pointer"}} 
                onClick={() => {
                }}>Pay Now</button>
            </StripeCheckout>
        </div>

    )
}

export default Pay