import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {apiClient} from "../../../axios/apiClient"; // твой axios клиент
import "./CartProduct.scss";


function CartProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [activeColor, setActiveColor] = useState("");
  const [activeSize, setActiveSize] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await apiClient.get(`/kicks/${id}`);
        setProduct(res.data);
        setActiveImage(res.data.images[0]);
        if (res.data.colors && res.data.colors.length > 0) {
          setActiveColor(res.data.colors[0]);
        }
        if (res.data.sizes && res.data.sizes.length > 0) {
          setActiveSize(res.data.sizes[0]);
        }
      } catch (err) {
        console.error("Ошибка загрузки товара:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="loading">Загрузка...</p>;
  }

  return (
    <div className="card-product">
      {/* Галерея */}
      {/* <div className="card-product__gallery">
        <div className="card-product__thumbs">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`thumb-${index}`}
              className={activeImage === img ? "active" : ""}
              onClick={() => setActiveImage(img)}
            />
          ))}
        </div>
        <div className="card-product__main-image">
          <img src={activeImage} alt={product.title} />
        </div>
      </div> */}
       <div className="cartproduct-images">
        {product.images?.slice(0, 4).map((img, index) => (
          <div key={index} className="cartproduct-image-box">
            <img className={"img"+index} src={img} alt={`${product.name}-${index}`} />
          </div>
        ))}
      </div>

      {/* Инфо */}
      <div className="card-product__info">
        <h1>{product.title}</h1>
        <p className="price">{product.price}</p>

        {/* Цвета */}
        {product.colors && product.colors.length > 0 && (
          <div className="colors">
            <h3>Color</h3>
            <div className="options">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  className={`color-btn ${activeColor === color ? "active" : ""}`}
                  onClick={() => setActiveColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Размеры */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="sizes">
            <h3>Size</h3>
            <div className="options">
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  className={`size-btn ${activeSize === size ? "active" : ""}`}
                  onClick={() => setActiveSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Кнопки */}
        <div className="actions">
          <button className="add-to-cart">Add to Cart</button>
          <button className="buy-now">Buy It Now</button>
        </div>

        {/* Описание */}
        <div className="description">
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;




// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import {apiClient} from "../../../axios/apiClient";
// import "./CartProduct.scss";

// export default function CartProduct() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     apiClient.get(`/kicks/${id}`)
//       .then((res) => setProduct(res.data))
//       .catch((err) => console.error(err));
//   }, [id]);

//   if (!product) return <div className="loading">Loading...</div>;

//   return (
//     <div className="cartproduct-container">
//       {/* Левая часть — фото */}
//       <div className="cartproduct-images">
//         {product.images?.slice(0, 4).map((img, index) => (
//           <div key={index} className="cartproduct-image-box">
//             <img src={img} alt={`${product.name}-${index}`} />
//           </div>
//         ))}
//       </div>

//       {/* Правая часть — инфо */}
//       <div className="cartproduct-info">
//         <h2 className="cartproduct-name">{product.name}</h2>
//         <p className="cartproduct-brand">{product.brand}</p>
//         <p className="cartproduct-category">{product.category}</p>
//         <p className="cartproduct-price">${product.price}</p>

//         {/* Цвета */}
//         {product.colors && (
//           <div className="cartproduct-colors">
//             <span>Colors:</span>
//             {product.colors.map((color, i) => (
//               <span key={i} className="color-dot" style={{ backgroundColor: color }}></span>
//             ))}
//           </div>
//         )}

//         {/* Размеры */}
//         {product.sizes && (
//           <div className="cartproduct-sizes">
//             <span>Sizes:</span>
//             {product.sizes.map((size, i) => (
//               <span key={i} className="size-box">{size}</span>
//             ))}
//           </div>
//         )}

//         {/* Кнопки */}
//         <div className="cartproduct-buttons">
//           <button className="btn-buy">Buy Now</button>
//           <button className="btn-cart">Add to Cart</button>
//         </div>

//         {/* Описание */}
//         <p className="cartproduct-description">{product.description}</p>
//       </div>
//     </div>
//   );
// }