// import React from 'react'
// import "./List.scss"
// import CardItem from "../Cards/CardItem/CardItem"

// function ProductList({ data }) {
//   return (
//     <div className='List-card'>
//       {data.map((item) => (
//         <CardItem key={item.id} cart={item} />
//       ))}
//     </div>
//   )
// }

// export default ProductList
import React from "react";
import "./List.scss";
import CardItem from "../Cards/CardItem/CardItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function ProductList({ data }) {
  if (!Array.isArray(data)) return null;
console.log(data);

  return (
    <div className="List-card">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={4}
        loop={true}
        grabCursor={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <CardItem key={item.id} cart={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductList;