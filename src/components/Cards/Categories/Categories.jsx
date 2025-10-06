import React from "react";
import "./Categories.scss";
import { ChevronLeft, ChevronRight } from "lucide-react"; // стрелки из lucide-react
import lifestyles from "../../../assets/image/lifestyle.png"
import basketballs from "../../../assets/image/basketball.png"
import { Link } from "react-router-dom";

function Categories() {
  return (
    <section data-aos="fade-left" data-aos-delay="200" className="categories1">
      <div   className="categories-header">
        <h2>CATEGORIES</h2>
        <div className="arrows">
          <button className="arrow-btn">
            <ChevronLeft size={24} />
          </button>
          <button className="arrow-btn">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div data-aos="fade-up" data-aos-delay="400" className="categories-grid">
     <Link to="casual">   <div className="category-card">
          <div className="img-wrapper">
           <img src={lifestyles} alt="Lifestyle Shoes" />
          </div>
          <h3 className="category-title">LIFESTYLE SHOES</h3>
        </div></Link>

    <Link to="lbasketball">  <div className="category-card">
          <div className="img-wrapper">
         <img src={basketballs} alt="Basketball Shoes" />
          </div>  
          <h3 className="category-title">BASKETBALL SHOES</h3>
        </div></Link>
      </div>
    </section>
  );
}

export default Categories;
