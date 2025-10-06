import React, { useEffect } from 'react'
import "./Card1.scss"
import { useDispatch, useSelector } from 'react-redux'
import { getSneakers } from '../../../redux/sneakers/sneakersSlice'
import ProductList from '../../ProductList/ProductList'

function Card1() {
  const dispatch = useDispatch()
  const { list, loading, error } = useSelector((state) => state.sneakers)

  useEffect(() => {
    dispatch(getSneakers())
  }, [dispatch])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error loading sneakers</p>

  return (
    <div data-aos="fade-up" data-aos-delay="200"  className='home-new'>
      <div className='home-title'>
        <div className='home-drops'>Don’t miss out new drops</div>
        <button className='home-btn'><p className='btn-p'>Shop New Drops</p></button>
      </div>
      <div className='home-cards'>
        <ProductList data={Object.values(list).flat()} />
      </div>
    </div>
  )
}

export default Card1