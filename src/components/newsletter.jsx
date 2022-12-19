import SendIcon from '@mui/icons-material/Send';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { doApiMethod, server_url } from '../services/apiServices';
import { mobile } from '../services/responsive';

const Container = styled.div`
 max-width:100% ;
height: 60vh;
background:#fcf5f5 ;
display: flex;
align-items: center;
justify-content: center;
flex-direction:column ;
`
const Title = styled.h1`
font-size: 70px;
margin-bottom: 20px;

`
const Desc = styled.div`
font-size: 20px;
font-weight: 300;
margin-bottom: 20px;
${mobile({
    textAlign: "center"
})}
`
const InputContainer = styled.div`
width: 50%;
height:40px ;
background:white ;
display: flex;
justify-content: space-between;
border:1px solid lightgrey ;
${mobile({
    width: "80%"
})}
`
const Form = styled.form`
display: flex;
width:100%;
`
const Input = styled.input`
width:100% ;
border:none ;
flex:8 ;
padding-left: 20px;
`
const Button = styled.button`
flex:1 ;
border:none;
background:teal;
color:white ;
cursor: pointer;
`

const Error = styled.span`
    color:red;
    word-wrap: break-word;
   `



const Newsletter = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubForm = (bodyData) => {
        // data -> מכיל את כל המאפיינים שלה השמות של האינפוטים עם הערך שלהם
        doApiForm(bodyData);
    }

    const doApiForm = async (bodyData) => {
        let url = server_url + "/email/sendemail"
        try {
            let resp = await doApiMethod(url, "POST", bodyData);
                alert("messege was sent succsfuly!")
        }
        catch (err) {
            console.log(err.response);
            alert("problem try again later")
        }
    }

    let msgRef = register("msg", { required: true, minLength: 5 })

    return (
        <Container>
            <Title>Newsletter</Title>
            <Desc>Send us a message if you want to be an admin and upload products please write your username also.</Desc>
            <InputContainer>
                <Form onSubmit={handleSubmit(onSubForm)}>
                    <Input {...msgRef} defaultValue='Hello my user is {username} and i want to an admin' />
                    {errors.msg && <Error>Enter valid messege, min 5 chars...</Error>}
                    <Button>
                        <SendIcon />
                    </Button>
                </Form>
            </InputContainer>
        </Container>
    )
}

export default Newsletter