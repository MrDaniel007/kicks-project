// import React, {useState} from 'react'
// import "./CardItem.scss"
// import { useNavigate } from 'react-router-dom'

// function CardItem({ cart, item }) {


//   const navigate = useNavigate();
//   const [hoveredId, setHoveredId] = useState(null); // для видимости кнопок

//   return (

//             <article
//                     className="card"
//                     onClick={() => navigate(`/cartproduct/${item.id}`)}
//                     data-aos="zoom-in"
//                     onMouseEnter={() => setHoveredId(item.id)}
//                     onMouseLeave={() => setHoveredId(null)}
//                   >
//   <div className='home-card'>
//       <div className='home-img-outside'>
//         <img className='home-img-inside' src={cart.images[0]} alt={cart.title} />
//         <div className='home-top-img'>New</div>
//       </div>
//       <div className='home-titles'>{cart.title}</div>
//       <button className='home-btn2'>${cart.price}</button>
//     </div>
//     </article>
//   )
// }

// export default CardItem

import React, { useState } from 'react';
import "./CardItem.scss";
import { useNavigate } from 'react-router-dom';




import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/carts-1/cartSlice";
import { addToFavorite } from "../../../redux/kicks/kicks";



function CardItem({ cart }) {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);

const dispatch = useDispatch();

const handleAddToCart = (item) => {
  dispatch(addToCart(item));
};

const handleAddToFavorite = (item) => {
  dispatch(addToFavorite(item));
};




  return (
    <article
      className="card"
      onClick={() => navigate(`/cartproduct/${cart.id}`)}
      data-aos="zoom-in"
      onMouseEnter={() => setHoveredId(cart.id)}
      onMouseLeave={() => setHoveredId(null)}
    >
      <div className='home-card'>
        <div className='home-img-outside'>
          <div className="card-icons">
  <button className="icon-btn" onClick={(e) => {
    e.stopPropagation();
    handleAddToCart(cart);
  }}>
    🛒
  </button>
  <button className="icon-btn" onClick={(e) => {
    e.stopPropagation();
    handleAddToFavorite(cart);
  }}>
    ❤️
  </button>
</div>
          <img className='home-img-inside' src={cart.images[0]} alt={cart.title} />
          <div className='home-top-img'>New</div>
        </div>
        <div className='home-titles'>{cart.title}</div>
        <button className='home-btn2'>${cart.price}</button>
      </div>
    </article>
  );
}

export default CardItem;