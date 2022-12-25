import React from 'react';
import styled from 'styled-components';
import { mobile } from '../services/responsive';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { doApiMethod, server_url, TOKEN_NAME } from '../services/apiServices';
import { toast } from 'react-toastify';

const Container = styled.div`
    width:100% ;
    height:100vh ;
    background-image:
    url("https://st4.depositphotos.com/12982378/23038/i/600/depositphotos_230387632-free-stock-photo-high-angle-view-smiling-woman.jpg") ;
    background-size:cover ;
    background-position:center ;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    padding: 20px;
    max-width:1000px ;
    margin-left:350px ;
    ${mobile({
    marginLeft: "0px"
})}
`
const Inside = styled.div`
   width:60% ;
   background:white ;
   margin-left:auto ;
   ${mobile({
    width: "75%"
})}
 
   `

const Title = styled.h1`   
    margin:0px ;
    font-size: 24px;
    font-weight:300 ;
`
const Form = styled.form`
    display: flex;
    flex-wrap:wrap ;
    ${mobile({
    padding: "10px"
})}
`
const Input = styled.input`
    flex:1 ;
    min-width:40% ;
    margin:16px 10px 0px 0px;
    padding:8px ;
    ${mobile({
    width: "100%"
})}


`
const Agreement = styled.span`
    font-size:12px ;
    margin:20px 0px ;
`
const Button = styled.button`
    width:40% ;
    border:none;
    padding:12px 16px ;
    background:teal ;
    color:white ;
    cursor: pointer;
    &:disabled{
        background:grey;
        cursor:not-allowed;
    }
`
const Error = styled.span`
    color:red;
    word-wrap: break-word;
    ${mobile({
    maxWidth: "50%"
})}
`

const Register = () => {
    const nav = useNavigate();
    const { register, getValues, handleSubmit, formState: { errors } } = useForm();

    const onSubForm = (bodyData) => {
        // data -> מכיל את כל המאפיינים שלה השמות של האינפוטים עם הערך שלהם
       delete bodyData.password2;
        doApiForm(bodyData);
    }

    const doApiForm = async (bodyData) => {
        let url = server_url + "/register/signup"
        try {
            let resp = await doApiMethod(url, "POST", bodyData);
            console.log(resp.data);
            nav("/login")
        }
        catch (err) {
            console.log(err.response);
            toast.error("try again");
        }
    }

    let usernameRef = register("username", { required: true, minLength: 3 });

    let passwordRef = register("password", { required: true, minLength: 6 });

    let passwordRef2 = register("password2", { required: true, validate:(value) =>
        value === getValues("password")
     });

    let phoneRef = register("phone", { required: true, minLength: 6 });

    let imgRef = register("img_url", { minLength: 6 });

    let emailRef = register("email", {
        required: true,
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    })


    return (
        <React.Fragment>
            <Container>
                <Wrapper>
                    <Inside>
                        <Title>CREATE AN ACCOUNT</Title>
                        <Form onSubmit={handleSubmit(onSubForm)}>

                            <Input type="text" {...usernameRef} placeholder='username' />
                            {errors.username && <Error>min 3 chars or alredy used...</Error>}

                            <Input type="number" {...phoneRef} placeholder='phone number' />
                            {errors.phone && <Error>Enter valid phone...</Error>}

                            <Input type="text" {...passwordRef} placeholder='password' />
                            {errors.password && <Error>Enter valid password,min 3 chars...</Error>}

                            <Input type="text" {...passwordRef2} placeholder='confirm password' />
                            {errors.password2 && <Error>password not match...</Error>}

                            <Input type="email" {...emailRef} placeholder='email' />
                            {errors.email && <Error>Enter valid email or alredy used...</Error>}

                            <Agreement>
                                By creating this account, I agree to the processing of my personal data in accordance with the <b>PRIVACY POLICE</b>
                            </Agreement>
                            <Button>CREATE</Button>
                        </Form>
                    </Inside>
                </Wrapper>
            </Container>
        </React.Fragment>
    )
}

export default Register