import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { mobile } from '../services/responsive';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { doApiMethod, server_url, TOKEN_NAME } from '../services/apiServices';
import { loginFailure, loginStart, loginSuccess } from "../features/userSlice";
import { toast } from 'react-toastify';


const Container = styled.div`
    width:100% ;
    max-width:100% ;
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
`
const Inside = styled.div`
   width:100% ;
   background:white ;
   margin-left:auto ;
   ${mobile({
    marginRight: "300px"
})}
   `

const Title = styled.h1`   
    margin:0px ;
    font-size: 24px;
    font-weight:300 ;
`
const Form = styled.form`
    padding: 8px;
    display: flex;
    flex-direction:column ;
   
`
const Input = styled.input`
    flex:1 ;
    width:240px ;
    margin:10px 0px;
    padding:8px ;

`
const Button = styled.button`
    margin:12px 0px  ;
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
const Link = styled.a`
    margin:4px 0px ;
    font-size:12px ;
    text-decoration:underline ;
    cursor: pointer;
`
const Error = styled.span`
    color:red;
    word-wrap: break-word;
    ${mobile({
    maxWidth: "50%"
})}
`

const Login = () => {
    const token = useSelector(state => state.user.currentUser.token);
    const user = useSelector(state => state.user.currentUser);
    const nav = useNavigate();
    const [type, setType] = useState("text");
    const dispatch = useDispatch();
    const { isFatching, error } = useSelector((state) => state.user)
    const { register, handleSubmit, formState: { errors } } = useForm();



    const onSubForm = (bodyData) => {
        // data -> מכיל את כל המאפיינים שלה השמות של האינפוטים עם הערך שלהם
        doApiForm(bodyData);
    }

    const doApiForm = async (bodyData) => {
        dispatch(loginStart());
        let url = server_url + "/register/login"
        try {
            let resp = await doApiMethod(url, "POST", bodyData);
            localStorage.setItem(TOKEN_NAME, resp.data.token);
            if (!resp.data.user.active) {
                toast.error(`Hello ${resp.data.user.username}, you were very naughty!`)
            }
            else if (resp.data.user.role === "admin") {
                nav("/admin")
            } else if (resp.data.user.role === "user") {
                nav("/")
            }
            dispatch(loginSuccess(resp.data));
        }
        catch (err) {
            console.log(err.response);
            dispatch(loginFailure())
            toast.error("User or password worng, or service down");
        }
    }

    let usernameRef = register("username", { required: true, minLength: 3 })

    let passwordRef = register("password", { required: true, minLength: 3 });


    return (
        <React.Fragment >
            <Container>
                <Wrapper>
                    <Inside>
                        <Form onSubmit={handleSubmit(onSubForm)}>
                            <Title>SIGN IN</Title>

                            <Input {...usernameRef} placeholder='username' />
                            {errors.username && <Error>Enter valid username...</Error>}

                            <Input {...passwordRef} type={type} placeholder='password' />

                            {errors.password && <Error>Enter valid password...</Error>}

                            <Button disabled={isFatching}>LOGIN</Button>

                            <Link onClick={() => nav("/signup")}>CREATE A NEW ACCOUNT</Link>
                            <Link>FORGOT THE PASSWORD ?</Link>
                        </Form>
                    </Inside>
                </Wrapper>
            </Container>
        </React.Fragment>
    )
}

export default Login