import React, { useEffect } from "react";
import { apiClient } from "../../../axios/apiClient";
import "./Cart.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../../../redux/carts-1/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const cartItems = cart.list || [];

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await apiClient.get("/cart"); 
      } catch (err) {
        console.error("Ошибка загрузки корзины:", err);
      }
    };
    fetchCart();
  }, [dispatch]);

  const removeItem = async (id) => {
    try {
      await apiClient.delete(`/cart/${id}`);
      // Удаляем из Redux
      dispatch(removeFromCart(id));
    } catch (err) {
      console.error("Ошибка удаления товара:", err);
      // Все равно удаляем из Redux при ошибке
      dispatch(removeFromCart(id));
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    
    try {
      await apiClient.patch(`/cart/${id}`, { quantity: newQuantity });
      // Обновляем в Redux - нужно добавить этот редюсер в ваш slice
      // dispatch(updateQuantityInCart({ id, quantity: newQuantity }));
    } catch (err) {
      console.error("Ошибка обновления количества:", err);
    }
  };

  // Защита от ошибок в вычислениях
  const total = cartItems.reduce((acc, item) => {
    const price = typeof item.price === 'string' 
      ? parseFloat(item.price.replace('$', '')) 
      : Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;
    return acc + (price * quantity);
  }, 0);

  const deliveryFee = 6.99;
  const finalTotal = total + deliveryFee;

  return (
    <div className="cart-page">
      {/* Левая часть */}
      <div className="cart-left">
        <h2>Your Bag</h2>
        <p className="info">
          Items in your bag not reserved - check out now to make them yours.
        </p>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <Link to="/listing" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        ) : (
          cartItems.map((item) => {
            const itemPrice = typeof item.price === 'string' 
              ? parseFloat(item.price.replace('$', '')) 
              : Number(item.price) || 0;
            
            return (
              <div className="cart-item" key={item.id}>
                <img 
                  src={item.image || item.images?.[0] || "https://placehold.co/100x100?text=No+Image"} 
                  alt={item.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/100x100?text=No+Image";
                  }}
                />
                <div className="item-info">
                  <h3>{item.title}</h3>
                  <p className="desc">{item.description}</p>
                  <p className="price">${itemPrice.toFixed(2)}</p>
                  <div className="item-options">
                    <span>Size {item.size || "N/A"}</span>
                    <div className="quantity-controls">
                      <button 
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                      >
                        -
                      </button>
                      <span>Quantity {item.quantity || 1}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="item-actions">
                  <button className="like">♥</button>
                  <button 
                    className="remove" 
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                  >
                    🗑
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Правая часть - показываем только если есть товары */}
      {cartItems.length > 0 && (
        <div className="cart-right">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>{cartItems.length} ITEM{cartItems.length !== 1 ? 'S' : ''}</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Sales Tax</span>
            <span>-</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
          <Link to="/checkout">
            <button className="checkout">CHECKOUT</button>
          </Link>
          <button 
            className="clear-cart" 
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
          <a href="#" className="promo" onClick={(e) => e.preventDefault()}>
            Use a promo code
          </a>
        </div>
      )}
    </div>
  );
}

export default Cart;