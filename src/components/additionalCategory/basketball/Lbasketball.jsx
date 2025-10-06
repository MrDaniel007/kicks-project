import React, { useEffect, useState } from "react";
import {apiClient} from "../../../axios/apiClient";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../redux/carts-1/cartSlice";
import { addToFavorite, removeFromFavorite } from "../../../redux/kicks/kicks";
import "./Lbasketball.scss";

function Lbasketball() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.kicks.favorites);

  useEffect(() => {
    apiClient.get("/kicks")
      .then((res) => {
        const filtered = res.data.filter((item) => item.category === "basketball");
        setProducts(filtered);
      })
      .catch((err) => console.log("Ошибка загрузки:", err));
  }, []);

  return (
    <div className="basketball-wrapper">
      <h2>Basketball Sneakers</h2>
      <div className="basketball-grid">
        {products.map((item) => {
          const isFavorite = favorites.some((fav) => fav.id === item.id);
          return (
            <div key={item.id} className="basketball-card" onClick={() => navigate(`/cartproduct/${item.id}`)}>
              <div className="basketball-img">
                <img src={item.images[0]} alt={item.title} />
                <div className="basketball-icons">
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
              <div className="basketball-title">{item.title}</div>
              <div className="basketball-price">${item.price}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Lbasketball;