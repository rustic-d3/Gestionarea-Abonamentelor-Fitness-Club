import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../css/subscriptions.css";

export default function Services() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [cnp, setCnp] = useState("");
  const [subscription, setSubscription] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  async function sendData() {
    try {
      await axios.post("http://localhost:3001/addSubscription", {
        cnp: cnp,
        subscription: subscription,
        price: currentPrice,
        finalPrice: finalPrice,
      });
      alert("Abonament activat cu succes!");
      setShowPopup(false);
      navigate("/subscriptions");
    } catch (error) {
      const errorMessage = error.response?.data?.details || "Eroare la activarea abonamentului.";
      alert(errorMessage);
    }
  }

  const openPurchaseModal = (name, price) => {
    setSubscription(name);
    setCurrentPrice(price);
    setShowPopup(true);
  };

  return (
    <div className="app-wrapper">
      <Header />
      
      <div className="services-main-container">
        <h1 className="services-title">Alege Planul Tău</h1>
        
        <div className="cards-container">
          {/* CARD SALA */}
          <div className="card glass-card">
            <div className="card-handle"></div>
            <div className="card-header" style={{ justifyContent: 'center' }}>
              <h2 className="card-title">Sală</h2>
            </div>
            <div className="card-content">
              <ul className="card-features">
                <li>Cele mai performante aparate</li>
                <li>Acces 24/7 în locație</li>
                <li>Acces saună și duș inclus</li>
              </ul>
            </div>
            <div className="card-footer">
              <button className="price-button" onClick={() => openPurchaseModal("Sala", 200)}>
                200 RON/LUNĂ
              </button>
            </div>
          </div>

          {/* CARD JOGGING */}
          <div className="card glass-card">
            <div className="card-handle"></div>
            <div className="card-header" style={{ justifyContent: 'center' }}>
              <h2 className="card-title">Jogging</h2>
            </div>
            <div className="card-content">
              <ul className="card-features">
                <li>Training de 3 ori pe săptămână</li>
                <li>Antrenor personal garantat</li>
                <li>Acces saună și duș</li>
              </ul>
            </div>
            <div className="card-footer">
              <button className="price-button" onClick={() => openPurchaseModal("Jogging", 150)}>
                150 RON/LUNĂ
              </button>
            </div>
          </div>

          {/* CARD SAUNA */}
          <div className="card glass-card">
            <div className="card-handle"></div>
            <div className="card-header" style={{ justifyContent: 'center' }}>
              <h2 className="card-title">Saună</h2>
            </div>
            <div className="card-content">
              <ul className="card-features">
                <li>Acces nelimitat Saună</li>
                <li>Acces dușuri premium</li>
                <li>Workshop nutriție online</li>
              </ul>
            </div>
            <div className="card-footer">
              <button className="price-button" onClick={() => openPurchaseModal("Sauna", 100)}>
                100 RON/LUNĂ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* POPUP ACHIZIȚIE */}
      {showPopup && (
        <div className="overlay">
          <div className="popup">
            <div className="popup-header">
              <button className="icon-btn" onClick={() => setShowPopup(false)}>✕</button>
              <h2>Plată: {subscription}</h2>
              <button onClick={sendData} className="icon-btn primary">↑</button>
            </div>
            <div className="form-container">
              <p className="modal-price-hint">Preț standard: {currentPrice} RON</p>
              <input 
                type="text" 
                placeholder="Introdu CNP Client" 
                className="search-input" 
                onChange={(e) => setCnp(e.target.value)} 
              />
              <input 
                type="number" 
                placeholder="Sumă Încasată" 
                className="search-input" 
                onChange={(e) => setFinalPrice(e.target.value)} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}