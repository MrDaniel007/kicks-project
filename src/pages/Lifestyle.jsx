import { useEffect, useState } from "react";
import { apiClient } from "../axios/apiClient"
import { Link } from "react-router-dom";

export default function Lifestyle() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    apiClient.get("/lifestyle")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Lifestyle Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-2"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-500">{item.category}</p>
              <p className="text-green-600 font-bold mt-2">${item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}