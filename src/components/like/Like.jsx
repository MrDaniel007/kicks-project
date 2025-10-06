import React from "react";
import "./Like.scss";
import { useSelector, useDispatch } from "react-redux";
import { removeFromFavorite } from "../../redux/kicks/kicks";
import { addToCart } from "../../redux/carts-1/cartSlice";
import { toast } from "react-toastify";

export default function Like() {
  const likedItems = useSelector((state) => state.kicks.favorites);
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success("✅ Added to cart!");
  };

const handleRemove = (id) => {
  dispatch(removeFromFavorite(id));
  toast.info("❌ Removed from favorites");
};

  return (
    <div className="like-page">
      <h2>❤️ Favorites</h2>

      {likedItems.length === 0 ? (
        <div className="like-empty">
          <p>You don't have any favorites... but that's easy to fix. 😎</p>
          <img src="https://placehold.co/600x400?text=No+Favorites" alt="No favorites" />
        </div>
      ) : (

        <div className="like-wrapper">
  {likedItems.map(item => (
    <div key={item.id} className="like-card">
      <img src={item.images?.[0]} alt={item.title} />
      <div className="like-info">
        <h3>{item.title}</h3>
        <p>{item.price} </p>
        <button onClick={() => handleAddToCart(item)}>Add to cart</button>
        <button onClick={() => handleRemove(item.id)}>✕ Cancel</button>
      </div>
    </div>
  ))}
</div>
      )}
    </div>
  );
}