import React from "react";
import { useNavigate } from "react-router-dom";
import "./Order.scss";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
<div className="order-confirmation">
  <h2>🎉 Order Confirmed!</h2>
  <p>Thank you for choosing our store. We're already celebrating with joy 💃</p>
  <p>Please expect a call or an email — we'll contact you shortly 📞📩</p>
  <button onClick={() => navigate("/listing")}>
    Return to shopping
  </button>
</div>
  );
};

export default OrderConfirmation;