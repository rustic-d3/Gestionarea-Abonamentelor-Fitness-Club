import React from "react";
import "../css/subscriptions.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Header from "../components/Header";

export default function Services() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [cnp, setCnp] = useState("");
  const [subscription, setSubscription] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);


  async function sendData() {
    console.log("Sending data to server...");
    console.log(cnp);
    console.log(subscription);
    console.log(currentPrice);
    console.log(finalPrice);
    try {
      const response = await axios.post(
        "http://localhost:3001/addSubscription",
        {
          cnp: cnp,
          subscription: subscription,
          price: currentPrice,
          finalPrice: finalPrice,
        }
      );
      console.log("Server response:", response.data);
      
    } catch (error) {
      console.error("Error sending CNP:", error);

      if (error.response) {
        const errorMessage =
          error.response.data.details || error.response.data.error;

        alert(errorMessage);
      } else {
        alert("Eroare de rețea. Serverul nu a putut fi contactat.");
      }
    }
    setShowPopup(false);
  }
  return (
    <div className="page-container">
      <Header></Header>

      <div className="cards-container">
        <div className="card">
          <div className="card-handle"></div>
          <div className="card-header">
            <div className="icon-circle icon-close">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <h2 className="card-title">Sală</h2>
            <div className="icon-circle icon-arrow">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
              </svg>
            </div>
          </div>
          <div className="card-content">
            <ul className="card-features">
              <li>Ai acces la cele mai performante aparate</li>
              <li>Acces 24/7 în sală</li>
              <li>Acces saună și duș</li>
            </ul>
          </div>
          <div className="card-footer">
            <button
              onClick={() => {
                setShowPopup(true);
                setSubscription("Sala");
                setCurrentPrice(200);
              }}
              className="price-button"
            >
              200 RON/MONTH
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-handle"></div>
          <div className="card-header">
            <div className="icon-circle icon-close">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <h2 className="card-title">Jogging</h2>
            <div className="icon-circle icon-arrow">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
              </svg>
            </div>
          </div>
          <div className="card-content">
            <ul className="card-features">
              <li>Training de 3 ori pe săptămână</li>
              <li>Ai un trainer garantat</li>
              <li>Acces saună și duș</li>
            </ul>
          </div>
          <div className="card-footer">
            <button
              onClick={() => {
                setShowPopup(true);
                setSubscription("Jogging");
                setCurrentPrice(150);
              }}
              className="price-button"
            >
              150 RON/MONTH
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-handle"></div>
          <div className="card-header">
            <div className="icon-circle icon-close">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <h2 className="card-title">Saună</h2>
            <div className="icon-circle icon-arrow">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
              </svg>
            </div>
          </div>
          <div className="card-content">
            <ul className="card-features">
              <li>Acces Saună</li>
              <li>Acces duș</li>
              <li>Workshop online despre alimentație</li>
            </ul>
          </div>
          <div className="card-footer">
            <button
              onClick={() => {
                setShowPopup(true);
                setSubscription("Sauna");
                setCurrentPrice(100);
              }}
              className="price-button"
            >
              100 RON/MONTH
            </button>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="overlay">
          <div className="popup">
            {/* Header */}
            <div className="popup-header">
              <button className="icon-btn" onClick={() => setShowPopup(false)}>
                ✕
              </button>

              <h2>Introduceți CNP Client si suma incasata:</h2>

              <button onClick={sendData} className="icon-btn primary">
                ↑
              </button>
            </div>

            {/* Search */}
            <input
              type="text"
              placeholder="CNP"
              className="search-input"
              onChange={(value) => setCnp(value.target.value)}
            />
            <input
              type="text"
              placeholder="Suma incasata"
              className="search-input"
              onChange={(value) => setFinalPrice(value.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
