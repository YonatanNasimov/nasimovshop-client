import styled from 'styled-components'

const Container = styled.div`
    height:28px ;
    background: teal ;
    color:white ;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    max-width:100% ;
`

const Announcement = () => {
    return (
        <Container>
            Super deal ! Free shipping on Orders over $50
        </Container>
    )
}

export default Announcement