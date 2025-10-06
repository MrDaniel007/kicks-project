// Reviews.jsx
import React from "react";
import "./Reviews.scss";
import noname from "../../../assets/svg/noname.svg"
import noname1 from "../../../assets/svg/noname1.svg"
import noname2 from "../../../assets/svg/noname2.svg"
import shoesb from "../../../assets/image/shoesb.png"
import shoesb1 from "../../../assets/image/shoesb1.png"
import shoesb2 from "../../../assets/image/shoesb2.png"

function Reviews() {
  return (
  <div data-aos="fade-right" data-aos-delay="400" className="reviews">
  <h2 className="title">REVIEWS</h2>
  <div className="reviews-grid">
    
    <div className="review-card">
      <div className="review-top">
        <h4>Good Quality</h4>
        <p>I highly recommend shopping from kicks</p>
        <p className="rating">⭐⭐⭐⭐⭐ 5.0</p>
        <img className="reviews-img" src={noname} alt="avatar" />
      </div>
      <img className="shoesb" src={shoesb} alt="shoes" />
    </div>

    <div className="review-card">
      <div className="review-top">
        <h4>Good Quality</h4>
        <p>I highly recommend shopping from kicks</p>
        <p className="rating">⭐⭐⭐⭐⭐ 5.0</p>
        <img className="reviews-img" src={noname1} alt="avatar" />
      </div>
      <img className="shoesb" src={shoesb1} alt="shoes" />
    </div>

    <div className="review-card">
      <div className="review-top">
        <h4>Good Quality</h4>
        <p>I highly recommend shopping from kicks</p>
        <p className="rating">⭐⭐⭐⭐⭐ 5.0</p>
        <img className="reviews-img" src={noname2} alt="avatar" />
      </div>
      <img className="shoesb" src={shoesb2} alt="shoes" />
    </div>

  </div>
</div>
  );
}

export default Reviews;