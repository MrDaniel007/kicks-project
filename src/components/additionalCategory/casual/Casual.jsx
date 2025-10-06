

// export default Casual;

// import React, { useEffect, useState } from "react";
// import {apiClient} from "../../../axios/apiClient";
// import CardItem from "../../Cards/CardItem/CardItem";
// import "./Casual.scss";

// function Casual() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     apiClient.get("/kicks")
//       .then((res) => {
//         const filtered = res.data.filter((item) => item.category === "casual");
//         setProducts(filtered);
//       })
//       .catch((err) => console.log("Ошибка загрузки:", err));
//   }, []);

//   return (
//     <div className="category-wrapper">
//       <h2>Casual Sneakers</h2>
//       <div className="category-grid">
//         {products.map((item) => (
//           <CardItem key={item.id} cart={item} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Casual;


import React, { useEffect, useState } from "react";
import {apiClient} from "../../../axios/apiClient";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../redux/carts-1/cartSlice";
import { addToFavorite, removeFromFavorite } from "../../../redux/kicks/kicks";
import "./Casual.scss";

function Casual() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.kicks.favorites);
// const isFavorite = favorites.some((fav) => fav.id === item.id);


  useEffect(() => {
    apiClient.get("/kicks")
      .then((res) => {
        const filtered = res.data.filter((item) => item.category === "casual");
        setProducts(filtered);
      })
      .catch((err) => console.log("Ошибка загрузки:", err));
  }, []);

 return (
  <div className="casual-grid">
    {products.map((item) => {
      const isFavorite = favorites.some((fav) => fav.id === item.id);
      return (
        <div key={item.id} className="casual-card" onClick={() => navigate(`/cartproduct/${item.id}`)}>
          <div className="casual-img">
            <img src={item.images[0]} alt={item.title} />
            <div className="casual-icons">
              <button
                className={`icon-btn ${isFavorite ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isFavorite) {
                    dispatch(removeFromFavorite(item.id));
                  } else {
                    dispatch(addToFavorite(item));
                  }
                }}
              >
                ❤️
              </button>
              <button
                className="icon-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(addToCart(item));
                }}
              >
                🛒
              </button>
            </div>
          </div>
          <div className="casual-title">{item.title}</div>
          <div className="casual-price">${item.price}</div>
        </div>
      );
    })}
  </div>
);
}

export default Casual;