import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { popularProducts } from "../services/data"
import Product from './product'
import { server_url } from "../services/apiServices"

const Container = styled.div`
 max-width:100% ;
    padding: 20px;
    display: flex;
    flex-wrap:wrap ;
    justify-content: space-between;
`

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);


  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `${server_url}/products?category=${cat}`
            : `${server_url}/products`
        );
        setProducts(res.data)
      } catch (err) {
        console.log(err)
      }
    };
    getProducts();
  }, [cat])

  useEffect(() => {
    cat &&
      setFilterProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilterProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilterProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilterProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);


  return (
    <Container>
      {cat
        ? filterProducts.map(item => { return (<Product key={item._id} item={item} />) })
        : products.slice(0, 8)
          .map(item => { return (<Product key={item._id} item={item} />) })}
    </Container>
  )
}

export default Products