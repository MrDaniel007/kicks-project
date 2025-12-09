// import { useState, useEffect } from "react";
// import "./Listing.scss";
// import { apiClient } from "../axios/apiClient";
// import AOS from "aos";
// import "aos/dist/aos.css";

// export default function Listing() {
//   const [products, setProducts] = useState([]);
//   const [filters, setFilters] = useState({
//     gender: [],
//     category: [],
//     sizes: [],
//     colors: [],
//     brand: [],
//     price: [0, 1000],
//   });
//   const [activeTags, setActiveTags] = useState([]);
//   const [showMobileFilters, setShowMobileFilters] = useState(false);

//   useEffect(() => {
//     AOS.init({ duration: 600 });
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await apiClient.get("/kicks");
//       const allItems = response.data;

//        const filtered = allItems.filter((item) => {
//         const matchGender =
//           filters.gender === 0 || filters.gender.includes(item.gender);
//         const matchCategory =
//           filters.category.length === 0 || filters.category.includes(item.category);
//         const matchSize =
//           filters.sizes.length === 0 || filters.sizes.includes(String(item.sizes));
//         const matchColor =
//           filters.colors.length === 0 || filters.colors.includes(item.colors);
//         const matchBrand =
//           filters.brand.length === 0 || filters.brand.includes(item.brand);
//         // const matchPrice =
//         //   item.price >= filters.price[0] && item.price <= filters.price[1];

//         return matchGender
//          && 
//         matchCategory
//          && matchSize 
//         && matchColor
//          && matchBrand
//         //  && matchPrice;
//       });

//       setProducts(filtered);
//     } catch (error) {
//       console.error("Ошибка загрузки товаров:", error);
//     }
//   };

//   const toggleFilter = (type, value) => {
//     const isActive = filters[type].includes(value);
//     const updated = isActive
//       ? filters[type].filter((v) => v !== value)
//       : [...filters[type], value];

//     setFilters({ ...filters, [type]: updated });

//     const tagLabel = `${value}`;
//     setActiveTags((prev) =>
//       isActive ? prev.filter((t) => t !== tagLabel) : [...prev, tagLabel]
//     );
//   };

//   const removeTag = (tag) => {
//     const updatedFilters = { ...filters };
//     for (let key in updatedFilters) {
//       updatedFilters[key] = updatedFilters[key].filter((v) => v !== tag);
//     }
//     setFilters(updatedFilters);
//     setActiveTags((prev) => prev.filter((t) => t !== tag));
//   };

//   console.log(products);
  

//   return (
//     <div className="listing-page">
//       <div className="left-panel">
//         <h2>Life Style Shoes</h2>
//         <p>{products.length} items</p>

//         <button className="mobile-toggle" onClick={() => setShowMobileFilters(!showMobileFilters)}>
//           Filters
//         </button>

//         <div className={`filters ${showMobileFilters ? "show" : ""}`}>
//           <h3>Refine By</h3>

//           <div className="filter-group">
//             <h4>Gender</h4>
//             {["Men", "Women"].map((g) => (
//               <button
//                 key={g}
//                 className={filters.gender.includes(g) ? "active" : ""}
//                 onClick={() => toggleFilter("gender", g)}
//               >
//                 {g}
//               </button>
//             ))}
//           </div>

//           <div className="filter-group">
//             <h4>Category</h4>
//             {["Golf", "Running", "Casual", "Basketball"].map((c) => (
//               <button
//                 key={c}
//                 className={filters.category.includes(c) ? "active" : ""}
//                 onClick={() => toggleFilter("category", c)}
//               >
//                 {c}
//               </button>
//             ))}
//           </div>

//           <div className="filter-group">
//             <h4>Size</h4>
//             {[38, 39, 40, 41, 42, 43, 44, 45].map((s) => (
//               <button
//                 key={s}
//                 className={filters.sizes.includes(String(s)) ? "active" : ""}
//                 onClick={() => toggleFilter("size", String(s))}
//               >
//                 {s}
//               </button>
//             ))}
//           </div>
//           <div className="filter-group">
//             <h4>Color</h4>
//             {["Black", "White", "Green", "Red", "Blue"].map((col) => (
//               <button
//                 key={col}
//                 className={filters.colors.includes(col) ? "active" : ""}
//                 onClick={() => toggleFilter("color", col)}
//               >
//                 {col}
//               </button>
//             ))}
//           </div>

//           <div className="filter-group">
//             <h4>Brand</h4>
//             {["Adidas", "Nike", "Puma", "Reebok"].map((b) => (
//               <button
//                 key={b}
//                 className={filters.brand.includes(b) ? "active" : ""}
//                 onClick={() => toggleFilter("brand", b)}
//               >
//                 {b}
//               </button>
//             ))}
//           </div>

//           <div className="filter-group">
//             <h4>Price</h4>
//             <input
//               type="range"
//               min="0"
//               max="1000"
//               value={filters.price[1]}
//               onChange={(e) =>
//                 setFilters({ ...filters, price: [0, Number(e.target.value)] })
//               }
//             />
//             <p>Up to ${filters.price[1]}</p>
//           </div>
//         </div>

//         <div className="active-tags">
//           {activeTags.map((tag, index) => (
//             <div key={index} className="tag">
//               {tag}
//               <span onClick={() => removeTag(tag)}>✕</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="right-panel">
//         <div className="product-grid">
//           {products.map((item) => (
//             <div key={item.id} className="product-card" data-aos="fade-up">
//               <img src={item.images[0]} alt={item.title} />
//               <h3>{item.title}</h3>
//               <p>{item.price}</p>
//               <button>VIEW PRODUCT</button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import "./Listing.scss";
import { apiClient } from "../../axios/apiClient";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Listing() {
  const [allItems, setAllItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    gender: [],
    category: [],
    sizes: [],
    colors: [],
    brand: [],
    price: [0, 1000],
  });
  const [activeTags, setActiveTags] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 600 });
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, allItems]);

  const fetchProducts = async () => {
    try {
      const response = await apiClient.get("/kicks");
      console.log("API Response:", response.data);
      setAllItems(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Ошибка загрузки товаров:", error);
    }
  };

  const applyFilters = () => {
    console.log("Applying filters:", filters);

    const filtered = allItems.filter((item) => {
      // Gender filter - используем точное сравнение
      const matchGender = filters.gender.length === 0 || 
        filters.gender.includes(item.gender);
      console.log("Gender match:", matchGender, "item gender:", item.gender, "filter gender:", filters.gender);

      // Category filter - приводим к нижнему регистру для сравнения
      const matchCategory = filters.category.length === 0 || 
        filters.category.some(filterCat => 
          item.category?.toLowerCase().includes(filterCat.toLowerCase())
        );
      console.log("Category match:", matchCategory, "item category:", item.category, "filter category:", filters.category);

      // Size filter - проверяем массив sizes
      const matchSize = filters.sizes.length === 0 || 
        filters.sizes.some(filterSize => 
          item.sizes?.includes(Number(filterSize))
        );
      console.log("Size match:", matchSize, "item sizes:", item.sizes, "filter sizes:", filters.sizes);

      // Color filter - проверяем массив colors
      const matchColor = filters.colors.length === 0 || 
        filters.colors.some(filterColor => 
          item.colors?.some(itemColor => 
            itemColor.toLowerCase().includes(filterColor.toLowerCase())
          )
        );
      console.log("Color match:", matchColor, "item colors:", item.colors, "filter colors:", filters.colors);

      // Brand filter - точное сравнение
      const matchBrand = filters.brand.length === 0 || 
        filters.brand.includes(item.brand);
      console.log("Brand match:", matchBrand, "item brand:", item.brand, "filter brand:", filters.brand);

      // Price filter - убираем $ и преобразуем в число
      const itemPrice = parseFloat(item.price?.replace('$', '') || 0);
      const matchPrice = itemPrice >= filters.price[0] && itemPrice <= filters.price[1];
      console.log("Price match:", matchPrice, "item price:", itemPrice, "filter price:", filters.price);

      const result = matchGender && matchCategory && matchSize && matchColor && matchBrand && matchPrice;
      console.log("Final result for item:", item.title, result);
      
      return result;
    });

    console.log("Filtered result count:", filtered.length);
    setProducts(filtered);
  };

  const toggleFilter = (type, value) => {
    console.log("Toggling filter:", type, value);
    setFilters(prev => {
      const isActive = prev[type].includes(value);
      const updated = isActive
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];
      
      return { ...prev, [type]: updated };
    });

    // Update active tags
    setActiveTags(prev => {
      const isActive = prev.includes(value);
      return isActive 
        ? prev.filter(t => t !== value)
        : [...prev, value];
    });
  };

  const removeTag = (tag) => {
    console.log("Removing tag:", tag);
    setFilters(prev => ({
      gender: prev.gender.filter(v => v !== tag),
      category: prev.category.filter(v => v !== tag),
      sizes: prev.sizes.filter(v => v !== tag),
      colors: prev.colors.filter(v => v !== tag),
      brand: prev.brand.filter(v => v !== tag),
      price: prev.price
    }));
    setActiveTags(prev => prev.filter(t => t !== tag));
  };

  const clearAllFilters = () => {
    setFilters({
      gender: [],
      category: [],
      sizes: [],
      colors: [],
      brand: [],
      price: [0, 1000],
    });
    setActiveTags([]);
  };

  return (
    <div className="listing-page">
      <div className="left-panel">
        <h2>Life Style Shoes</h2>
        <p>{products.length} items</p>

        <button className="mobile-toggle" onClick={() => setShowMobileFilters(!showMobileFilters)}>
          Filters
        </button>

        <div className={`filters ${showMobileFilters ? "show" : ""}`}>
          {/* <div className="filter-header">
            <h3>Refine By</h3>
            <button className="clear-all" onClick={clearAllFilters}>
              Clear All
            </button>
          </div> */}

          {/* Gender Filter */}
          <div className="filter-group">
            <h4>Gender</h4>
            {["male", "women"].map((g) => (
              <button
                key={g}
                className={filters.gender.includes(g) ? "active" : ""}
                onClick={() => toggleFilter("gender", g)}
              >
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <h4>Category</h4>
            {["golf", "running", "casual", "basketball"].map((c) => (
              <button
                key={c}
                className={filters.category.includes(c) ? "active" : ""}
                onClick={() => toggleFilter("category", c)}
              >
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>

          {/* Size Filter */}
          <div className="filter-group">
            <h4>Size</h4>
            {[38, 39, 40, 41, 42, 43, 44, 45].map((s) => (
              <button
                key={s}
                className={filters.sizes.includes(String(s)) ? "active" : ""}
                onClick={() => toggleFilter("sizes", String(s))}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Color Filter */}
          <div className="filter-group">
            <h4>Color</h4>
            {["black", "white", "green", "red", "blue", "yellow", "gray"].map((col) => (
              <button
                key={col}
                className={filters.colors.includes(col) ? "active" : ""}
                onClick={() => toggleFilter("colors", col)}
              >
                {col.charAt(0).toUpperCase() + col.slice(1)}
              </button>
            ))}
          </div>

          {/* Brand Filter */}
          <div className="filter-group">
            <h4>Brand</h4>
            {["Adidas", "Nike", "Puma", "Reebok"].map((b) => (
              <button
                key={b}
                className={filters.brand.includes(b) ? "active" : ""}
                onClick={() => toggleFilter("brand", b)}
              >
                {b}
              </button>
            ))}
          </div>

          {/* Price Filter */}
          <div className="filter-group">
            <h4>Price</h4>
            <input
              type="range"
              min="0"
              max="1000"
              value={filters.price[1]}
              onChange={(e) =>
                setFilters({ ...filters, price: [0, Number(e.target.value)] })
              }
            />
            <p>Up to ${filters.price[1]}</p>
          </div>
        </div>

        {/* Active Filter Tags */}
        {activeTags.length > 0 && (
          <div className="active-tags">
            {activeTags.map((tag, index) => (
              <div key={index} className="tag">
                {tag}
                <span onClick={() => removeTag(tag)}>✕</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product List */}
      <div className="right-panel">
        <div className="product-grid">
          {products.map((item) => {
       const itemPrice = typeof item.price === "string"
  ? parseFloat(item.price.replace("$", ""))
  : Number(item.price);
            return (
              <div key={item.id} className="product-card" data-aos="fade-up">
                <img
                  src={item.images?.[0] || "https://placehold.co/600x600?text=No+Image"}
                  alt={item.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/600x600?text=No+Image";
                  }}
                />
                <h3>{item.title}</h3>
                <p>${itemPrice}</p>
                <button>VIEW PRODUCT</button>
              </div>
            );
          })}
          {products.length === 0 && (
            <div className="no-products">
              <p>No products found matching your filters</p>
              <button onClick={clearAllFilters}>Clear all filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}