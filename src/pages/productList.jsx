import { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Products from '../components/products'
import { mobile } from '../services/responsive'

const Container = styled.div`
`
const Title = styled.h1`
    margin:20px ;
`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin:0 80px ;
    ${mobile({
    margin: "0px"
})}
`
const Filter = styled.div`
    margin: 20px;
    ${mobile({
    margin: "0px 30px",
    display: "flex",
    flexDirection: "column"
})}
`
const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right:12px ;
    ${mobile({
    fontSize: "16px",
})}
`
const Select = styled.select`
padding: 8px;
margin-right:20px ;
${mobile({
    padding: "2px", margin: "4px 0px"
})}
`
const Option = styled.option`
`
const ProductList = () => {

    const params = useParams();

    const cat = params["category"];

    const [filter, setFilter] = useState({});
    const [sort, setSort] = useState("newest");

    const handleFilters = (e) => {
        const value = e.target.value;
        setFilter({
            ...filter,
            [e.target.name]: value,
        });
    };
    return (
        <Container>
            <Title>{cat}:</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter products:</FilterText>
                    <Select name='color' onChange={handleFilters} defaultValue={"Color"}>
                        <Option>Color</Option>
                        <Option>white</Option>
                        <Option>black</Option>
                        <Option>red</Option>
                        <Option>blue</Option>
                        <Option>yellow</Option>
                        <Option>green</Option>
                    </Select>
                    <Select name='size' onChange={handleFilters} defaultValue={"Size"}>
                        <Option>Size</Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort products:</FilterText>
                    <Select onChange={(e) => setSort(e.target.value)} defaultValue={"Newest"}>
                        <Option value="newest">Newest</Option>
                        <Option value="asc">Price(asc)</Option>
                        <Option value="desc">Price(desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            
            <Products cat={cat} filters={filter} sort={sort}/>
        </Container>
    )
}

export default ProductList