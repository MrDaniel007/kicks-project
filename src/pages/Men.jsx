import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../axios/apiClient";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Men.scss";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/carts-1/cartSlice";
import { addToFavorite, removeFromFavorite } from "../redux/kicks/kicks";

function Men() {
  const [items, setItems] = useState({});
  const [hoveredId, setHoveredId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

   const favorite = useSelector((state) => state.kicks.favorites);

  useEffect(() => {
    AOS.init({ duration: 700, once: true });

    async function fetchMenShoes() {
      try {
        const res = await apiClient.get("/kicks?gender=male");

        const grouped = res.data.reduce((acc, item) => {
          if (!acc[item.brand]) acc[item.brand] = [];
          acc[item.brand].push(item);
          return acc;
        }, {});

        setItems(grouped);
        setTimeout(() => AOS.refresh(), 80);
      } catch (error) {
        console.error("❌ Ошибка при загрузке мужской коллекции:", error);
      }
    }

    fetchMenShoes();
  }, []);



  return (
    <div className="men" data-aos="fade-up">
      <h1 className="mc-title" data-aos="zoom-in">Men&apos;s Collection</h1>

      {Object.keys(items).map((brand) => (
        <section key={brand} className="brand-block" data-aos="fade-up">
          <h2 className="brand-title">{brand}</h2>
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={20}
            slidesPerView={5}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 10 },
              480: { slidesPerView: 2, spaceBetween: 10 },
              768: { slidesPerView: 3, spaceBetween: 14 },
              1024: { slidesPerView: 4, spaceBetween: 18 },
            }}
            loop={items[brand]?.length > 5}
          >
            {items[brand]?.slice(0, 50).map((item) => {
              const images = Array.isArray(item.images)
                ? item.images
                : item.images
                  ? [item.images]
                  : [];
              const price = item.price ?? "";

              return (
                <SwiperSlide key={item.id}>
                  <article
                    className="card"
                    onClick={() => navigate(`/cartproduct/${item.id}`)}
                    data-aos="zoom-in"
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div className="img-container" title={item.title}>
                    <img
                        className="img main"
                        src={images[0]}
                        alt={item.title}
                        // onError={(e) => (e.currentTarget.src = safeSrc(null))}
                      />
                      {images[1] && (
                        <img
                          className="img hover"
                          src={images[1]}
                          alt={item.title + " alt"}
                          
                        />
                      )}
                      <div
                        className={`actions ${hoveredId === item.id ? "visible" : ""
                          }`}
                      >
                        <button
                          className={`icon icon-heart ${favorite.some((fav) => fav.id === item.id)
                            ? "active"
                            : ""
                            }`}
                          aria-label="wishlist"
                          onClick={(e) => {
                            e.stopPropagation();
                            const isFav = favorite.some(
                              (fav) => fav.id === item.id
                            );
                            if (isFav) {
                              dispatch(removeFromFavorite(item.id));
                            } else {
                              dispatch(addToFavorite(item));
                            }
                          }}
                        >
                          <FaHeart size={20} />
                        </button>

                        <button className="btn-mens"
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(
                              addToCart({
                                id: item.id,
                                title: item.title,
                                price: item.price,
                                image: item.images?.[0],
                              })
                            );
                          }}
                        >
                          <FaShoppingCart size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="info">
                      <p className="item-title">{item.title}</p>
                      {price && <p className="item-price">${price}</p>}
                      <div className="meta">
                        <span className="item-brand">{item.brand}</span>
                        <span className="item-cat">{item.category}</span>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </section>
      ))}
    </div>
  );
}

export default Men;