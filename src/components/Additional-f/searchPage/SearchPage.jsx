import { useState, useEffect } from "react";
import "./SearchPage.scss";
import { apiClient } from "../../../axios/apiClient";
import send from "../../../assets/image/send.png"
import mic from "../../../assets/image/mic.png"


export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
const [results, setResults] = useState([]);
  // Микрофон
  const startMic = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "ru-RU";
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setQuery(text);
    };
    recognition.start();
  };

  // Поиск
  const handleSearch = async () => {
     if (!query.trim()) return;

  try {
    const response = await apiClient.get("/kicks"); // получаем все карточки
    const allItems = response.data;

    // Фильтруем по имени
    const filtered = allItems.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered); // сохраняем отфильтрованные
    console.log("Найдено:", filtered);
  } catch (error) {
    console.error("Ошибка при поиске:", error);
  }

  setHistory((prev) => [query, ...prev.filter((item) => item !== query)]);
    // Сохраняем в историю
    setHistory((prev) => [query, ...prev.filter((item) => item !== query)]);

    // 🔥 Тут вставь свой API
    console.log("/kicks", query);
  };

  // Подсказки при вводе
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = history.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filtered);
  }, [query, history]);

  return (
    <div data-aos="zoom-out-up" className="search-page">
      <h1>Site search</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter rou request ..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>
          <img className="how" src={send} alt="Search" />
        </button>
        <button className="mic-button" onClick={startMic}>
          <img className="how" src={mic} alt="Mic" />
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((item, index) => (
            <div key={index} className="suggestion" onClick={() => setQuery(item)}>
              {item}
            </div>
          ))}
        </div>




      )}



      {results.length > 0 && (
  <div className="results">
    {results.map((item) => (
      <div key={item.id} className="card">
        <img className="img-search" src={item.images[0]} alt={item.title} />
        <h3 className="h3-search">{item.title}</h3>
        <p className="p-search">{item.description}</p>
      </div>
    ))}
  </div>
)}
    </div>
  );
}