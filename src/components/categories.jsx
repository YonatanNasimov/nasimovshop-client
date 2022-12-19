import styled from 'styled-components'
import {categories} from "../services/data"
import { mobile } from '../services/responsive'
import CategoryItem from './categoryItem'

const Container = styled.div`
    display: flex;
    padding: 20px;
    align-items: center;
    justify-content: center;
    max-width:100% ;
    ${mobile({
            padding:"0px",
            flexDirection:"column"
    })}
`

const Categories = () => {
  return (
    <Container>
        {categories.map(item => {
            return(
                <CategoryItem key={item.id} item={item}/>
            )
        })}
    </Container>
  )
}

export default Categories