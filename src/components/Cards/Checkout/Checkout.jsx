



import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveOrder, clearCart } from "../../../redux/carts-1/cartSlice";
import "./Checkout.scss";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart);
  const cartItems = cart.list || [];

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    billingSame: false,
    ageConfirm: false,
    newsletter: false,
  });

  const [errors, setErrors] = useState({});
  const [delivery, setDelivery] = useState("standard");

  const subtotal = cartItems.reduce((acc, item) => {
    const price = typeof item.price === 'string' 
      ? parseFloat(item.price.replace('$', '')) 
      : Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;
    return acc + (price * quantity);
  }, 0);

  const deliveryFee = delivery === "standard" ? 6.00 : 0;
  const total = subtotal + deliveryFee;

  const validate = () => {
    let newErrors = {};
    if (!formData.email.includes("@")) newErrors.email = "Enter the coorect Gmail";
    if (!formData.firstName.trim()) newErrors.firstName = "Enter name";
    if (!formData.lastName.trim()) newErrors.lastName = "Enter your last name";
    if (!formData.address.trim()) newErrors.address = "Enter delivery addres";
    if (!/^\+?\d{9,15}$/.test(formData.phone)) newErrors.phone = "Enter the correct number";
    if (!formData.ageConfirm) newErrors.ageConfirm = "Please confirm that you are 13 years of age or older";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(saveOrder({
        total: subtotal,
        delivery: deliveryFee,
        finalTotal: total,
        shippingInfo: formData,
        deliveryOption: delivery
      }));

      // Показываем прикольное сообщение
      const message = cartItems.length === 1
        ? "✅ Your order has been placed!"
        : "✅ Yours orders are completed!";
      alert(message);

      // Очищаем форму
      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        phone: "",
        billingSame: false,
        ageConfirm: false,
        newsletter: false,
      });

      // Очищаем корзину
      dispatch(clearCart());

      // Переход на страницу подтверждения
      navigate("/orderconfirmation");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout">
        <div className="empty-cart-message">
          <h2>Cart is empty</h2>
          <p>Add products to place an order</p>
          <button onClick={() => navigate("/listing")}>
            Return to shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="checkout-left">
        <h2>Contct details</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" name="email" placeholder="example@gmail.com" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}

          <h2>Delivery address</h2>
          <div className="name-row">
            <div>
              <input type="text" name="firstName" placeholder="firstName*" value={formData.firstName} onChange={handleChange} />
              {errors.firstName && <span className="error">{errors.firstName}</span>}
            </div>
            <div>
              <input type="text" name="lastName" placeholder="lastName*" value={formData.lastName} onChange={handleChange} />
              {errors.lastName && <span className="error">{errors.lastName}</span>}
            </div>
          </div>
          <input type="text" name="address" placeholder="address*" value={formData.address} onChange={handleChange} />
          {errors.address && <span className="error">{errors.address}</span>}

          <input type="text" name="phone" placeholder="phone*" value={formData.phone} onChange={handleChange} />
          {errors.phone && <span className="error">{errors.phone}</span>}

          <h2>Delivery</h2>
          <div className={`delivery-option ${delivery === "standard" ? "active" : ""}} onClick={() => setDelivery("standard")`}>
            <span>Standart delivery</span>
            <span>$6.00</span>
          </div>
          <div className={`delivery-option ${delivery === "store" ? "active" : ""}} onClick={() => setDelivery("store")`}>
            <span>Self-call</span>
            <span>Free</span>
          </div>

          <div className="checkboxes">
            <label>
              <input type="checkbox" name="billingSame" checked={formData.billingSame} onChange={handleChange} />
              the payment address matches the delivery address
            </label>
            <label>
              <input type="checkbox" name="ageConfirm" checked={formData.ageConfirm} onChange={handleChange} />
              I am 13 or older
            </label>
            {errors.ageConfirm && <span className="error">{errors.ageConfirm}</span>}
            <label>
              <input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange} />
              I want to recieve news and promotions
            </label>
          </div>

          <button type="submit" className="checkout-btn">
            Order
          </button>
        </form>
      </div>

      <div className="checkout-right">
        <h2>order summary</h2>
        <div className="summary">
          <div className="row">
            <span>{cartItems.length} product{cartItems.length !== 1 ? "а" : ""}</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="row">
            <span>Deliver</span>
            <span>{delivery === "standard" ? "$6.00" : "Бесплатно"}</span>
          </div>
          <div className="row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <h2>Products</h2>
        <div className="order-items">
          {cartItems.map((item) => {
            const itemPrice = typeof item.price === 'string' 
              ? parseFloat(item.price.replace('$', '')) 
              : Number(item.price) || 0;

            return (
        <div className="order-item" key={item.id}>
                <img 
                  src={item.image || item.images?.[0] || "https://placehold.co/80x80?text=No+Image"} 
                  alt={item.title}
                />
                <div className="item-details">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  <p>Size: {item.size || "N/A"} | quantity: {item.quantity || 1}</p>
                  <span className="price">${itemPrice.toFixed(2)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Checkout;