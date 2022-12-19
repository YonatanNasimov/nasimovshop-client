import React from 'react'
import Categories from '../components/categories'
import Newsletter from '../components/newsletter'
import Products from '../components/products'
import Slider from '../components/slider'

const Home = () => {
  return (
    <div style={{maxWidth:"100%",overflowX:"hidden"}}>
        <Slider/>
        <Categories/>
        <Products/>
        <Newsletter/>
    </div>
  )
}

export default Home