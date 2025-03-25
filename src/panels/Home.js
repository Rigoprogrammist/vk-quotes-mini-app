import { useState } from "react";
import PropTypes from "prop-types";
import "../index.css";

export const Home = () => {
  // const [status, setStatus] = useState("...");
  const [quote, setQuote] = useState("");

  const generateQuote = async () => {
    try {
      const response = await fetch("http://localhost:5000/quote"); 
      const data = await response.json();
      setQuote(data.quote);
    } catch (error) {
      console.error("Ошибка получения цитаты:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Привет!</h1>
      <p className="description">Я составляю цитату, используя слова из твоего статуса.</p>
      <p className="status">Твой статус: {status}</p>
      <button className="btn generate-btn" onClick={generateQuote}>
        Сгенерировать цитату
      </button>
      {quote && (
        <div className="quote-container">
          <p className="quote">{quote}</p>
          <button className="btn repeat-btn" onClick={generateQuote}>
            Повторить
          </button>
        </div>
      )}
    </div>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};

