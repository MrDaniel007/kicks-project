// src/pages/Women.jsx
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
import "./Women.scss";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite, removeFromFavorite } from "../redux/kicks/kicks";
import { addToCart } from "../redux/carts-1/cartSlice";

function Women({ onToggleWishlist = () => {}, onAddToCart = () => {} }) {
  const [items, setItems] = useState({});
  const [wishlist, setWishlist] = useState([]); // ids
  const dispatch = useDispatch();
  const [cartMap, setCartMap] = useState({}); // { id: count }
  const [hoveredId, setHoveredId] = useState(null); // для видимости кнопок
  const navigate = useNavigate();
  
  const cart = useSelector(state => state.cart.items); // объект {id: count}
 const favorite = useSelector((state) => state.kicks.favorites);

  useEffect(() => {
    AOS.init({ duration: 700, once: true });

    apiClient
      .get("/kicks", { params: { gender: "women" } })
      .then((res) => {
        const grouped = res.data.reduce((acc, item) => {
          if (!acc[item.brand]) acc[item.brand] = [];
          acc[item.brand].push(item);
          return acc;
        }, {});
        setItems(grouped);
        setTimeout(() => AOS.refresh(), 80);
      })
      .catch((err) => console.error("API /kicks error:", err));
  }, []);

  const safeSrc = (src) => src || "https://via.placeholder.com/600x600?text=No+image";

  // УДАЛИТЕ эту функцию - она конфликтует с импортом
  // function addToCart(id) {
  //   setCartMap(prev => {
  //     const next = { ...prev, [id]: (prev[id] || 0) + 1 };
  //     onAddToCart(next);
  //     return next;
  //   });
  // }

  const toggleFavorite = (item) => {
    const isAlreadyFavorite = favorite.some(fav => fav.id === item.id);

    if (isAlreadyFavorite) {
      dispatch(removeFromFavorite(item.id));
    } else {
      dispatch(addToFavorite(item));
    }
  };

  // Новая функция для добавления в корзину с Redux
  const handleAddToCart = (item) => {
    // Добавляем в Redux
    dispatch(addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.images?.[0],
      // добавьте другие необходимые поля
    }));
    
    // Обновляем локальное состояние (если нужно)
    setCartMap(prev => {
      const next = { ...prev, [item.id]: (prev[item.id] || 0) + 1 };
      onAddToCart(next); // проброс наверх для Header
      return next;
    });
  };

  return (
    <div className="women" data-aos="fade-up">
      <h1 className="wc-title" data-aos="zoom-in">Women&apos;s Collection</h1>

      {Object.keys(items).map((brand) => (
        <section key={brand} className="brand-block" data-brand={brand} data-aos="fade-up">
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
              const images = Array.isArray(item.images) ? item.images : (item.images ? [item.images] : []);
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
                        src={safeSrc(images[0])}
                        alt={item.title}
                        onError={(e) => (e.currentTarget.src = safeSrc(null))}
                      />
                      {images[1] && (
                        <img
                          className="img hover"
                          src={safeSrc(images[1])}
                          alt={item.title + " alt"}
                          onError={(e) => (e.currentTarget.src = safeSrc(null))}
                        />
                      )}
                      <div className={`actions ${hoveredId === item.id ? "visible" : ""}`}>
                        <button
                          className={`icon icon-heart ${favorite.some(fav => fav.id === item.id) ? "active" : ""}`}
                          aria-label="wishlist"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(item);
                          }}
                        >
                          <FaHeart size={20} />
                        </button>

                        <button
                          className="icon icon-cart"
                          aria-label="add-to-cart"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(item); // используем новую функцию
                          }}
                        >
                          <FaShoppingCart size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="info">
                      <p className="item-title">{item.title}</p>
                      {price && <p className="item-price">{price}</p>}
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

export default Women;