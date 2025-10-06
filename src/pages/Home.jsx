import React, { useEffect } from 'react'
import Banner from '../components/Banner/Banner'
import "./Home.scss"
import { useDispatch, useSelector } from 'react-redux'
import { getSneakers } from '../redux/sneakers/sneakersSlice'
import ProductList from '../components/ProductList/ProductList'
import Card1 from '../components/Cards/Card-1/Card1'
import Categories from '../components/Cards/Categories/Categories'
import Reviews from '../components/Cards/Reviewss/Reviews'

function Home() {


  return (
    <div style={{overflow:"hidden"}}>
      <Banner />

      <Card1 />
      <Categories/>
      <Reviews/>
    </div>
  )
}

export default Home
