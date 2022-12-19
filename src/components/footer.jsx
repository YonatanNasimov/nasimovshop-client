import styled from 'styled-components';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import RoomIcon from '@mui/icons-material/Room';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { mobile } from '../services/responsive';

const Container = styled.footer`
 max-width:100% ;
display: flex;
padding:0 100px ;
box-shadow: 0px -3px 13px -2px rgba(0,0,0,0.86);
${mobile({
        flexDirection:"column",
        padding:"0px",
        maxWidth:"100%"
    })}
`
const Left = styled.div`
flex:1 ;
display: flex;
flex-direction:column ;
padding: 20px;
${mobile({
        padding:"24px",
        maxWidth:"90%"
    })}
`
const Logo = styled.h1`

`
const Desc = styled.p`
margin: 20px 0px;
`
const SocialContainer = styled.div`
display: flex;
`
const SocialIcon = styled.div`
width: 40px;
height: 40px;
color:white ;
border-radius:50% ;
background:${props => props.color} ;
display: flex;
align-items: center;
justify-content: center;
margin-right:16px ;
`
const Center = styled.div`
flex:1 ;
padding: 20px;
${mobile({
        display:"none"
    })}
`

const Title = styled.h3`
margin-bottom:30px ;
`
const List = styled.ul`
margin: 0;
padding: 0;
list-style:none ;
display: flex;
flex-wrap:wrap ;
`

const ListItem = styled.li`
width:50% ;
margin-bottom:8px ;
`

const Right = styled.div`
flex:1 ;
padding: 20px;
${mobile({
        background:"#eee",
    })}
`
const ContactItem = styled.div`
margin-bottom:20px ;
display: flex;
align-items: center;
`
const Payment = styled.img`
width:50% ;
`

const Footer = () => {
    return (
        <Container style={{maxWidth:"100%",overflowX:"hidden"}}>
            <Left>
                <Logo>NASIMOV.</Logo>
                <Desc>There are many sites for buying clothes, true, but they are not like us. We guarantee the best quality and the fastest order time. Try us!</Desc>
                <SocialContainer>
                    <SocialIcon color="navy">
                        <FacebookIcon />
                    </SocialIcon>
                    <SocialIcon color="#E4405F">
                        <InstagramIcon />
                    </SocialIcon>
                    <SocialIcon color="#55ACEE">
                        <TwitterIcon />
                    </SocialIcon>
                    <SocialIcon color="#E60023">
                        <PinterestIcon />
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Man Fashion</ListItem>
                    <ListItem>Woman Fashion</ListItem>
                    <ListItem>Accesories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Traking</ListItem>
                    <ListItem>WishList</ListItem>
                    <ListItem>terms</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <RoomIcon style={{marginRight:"10px"}}/>
                    Derech Menachem Begin 132, Tel Aviv
                </ContactItem>
                <ContactItem>
                    <PhoneIcon style={{marginRight:"10px"}}/> +972 54 721 1498
                </ContactItem>
                <ContactItem>
                    <EmailOutlinedIcon style={{marginRight:"10px"}}/> yonatannasimov@gmail.com
                </ContactItem>
                <Payment alt='Payment' src='https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43279012100/original/NQaEc3sL6Gso96fAdUWRiHZ5G9UUaHgUog.png?1639064459'/>
            </Right>
        </Container>
    )
}

export default Footer