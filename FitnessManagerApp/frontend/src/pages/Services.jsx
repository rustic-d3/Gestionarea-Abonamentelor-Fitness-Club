import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../css/subscriptions.css"; // sau clients.css daca ai stilurile comune acolo

export default function Services() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  
  // State-uri pentru date
  const [cnp, setCnp] = useState("");
  const [subscription, setSubscription] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState("");

  // State pentru erori
  const [errors, setErrors] = useState({});

  // --- LOGICA DE VALIDARE ---
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // 1. Validare CNP (fix 13 cifre)
    if (!cnp || cnp.length !== 13) {
      newErrors.cnp = "CNP-ul trebuie să aibă exact 13 cifre.";
      isValid = false;
    }

    // 2. Validare Sumă (Trebuie să existe și să fie număr)
    if (!finalPrice || Number(finalPrice) < 0) {
      newErrors.finalPrice = "Introduceți o sumă validă.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handler pentru a permite DOAR CIFRE la tastare (CNP)
  const handleCnpInput = (e) => {
    const val = e.target.value.replace(/\D/g, ''); // Șterge orice nu e cifră
    setCnp(val);
    if (errors.cnp) setErrors({ ...errors, cnp: null }); // Șterge eroarea
  };

  // Handler pentru Sumă (permite cifre și curăță erorile)
  const handlePriceInput = (e) => {
    setFinalPrice(e.target.value);
    if (errors.finalPrice) setErrors({ ...errors, finalPrice: null });
  };

  async function sendData() {
    // Oprim execuția dacă validarea eșuează
    if (!validateForm()) return;

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
    setFinalPrice(""); // Resetăm prețul introdus
    setCnp("");        // Resetăm CNP-ul
    setErrors({});     // Resetăm erorile anterioare
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

      {/* POPUP ACHIZIȚIE CU VALIDARE */}
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
              
              {/* INPUT CNP - VALIDAT */}
              <div>
                <input 
                    type="text" 
                    placeholder="Introdu CNP Client (13 cifre)" 
                    className={`search-input ${errors.cnp ? 'input-error' : ''}`}
                    maxLength="13"
                    value={cnp}
                    onChange={handleCnpInput} 
                />
                {errors.cnp && <span className="error-msg">{errors.cnp}</span>}
              </div>

              {/* INPUT SUMĂ - VALIDAT */}
              <div>
                <input 
                    type="number" 
                    placeholder="Sumă Încasată" 
                    className={`search-input ${errors.finalPrice ? 'input-error' : ''}`}
                    value={finalPrice}
                    onChange={handlePriceInput} 
                />
                {errors.finalPrice && <span className="error-msg">{errors.finalPrice}</span>}
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}