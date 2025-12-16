import React from 'react'
import '../css/subscriptions.css';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

export default function Subscriptions() {
    const [showPopup, setShowPopup] = useState(false);
    const [cnp, setCnp] = useState("");
    const [subscription, setSubscription] = useState("");
    const [currentPrice, setCurrentPrice] = useState(0);

    async function sendData(){
        console.log("Sending data to server...");
        console.log(cnp);
        console.log(subscription);
        console.log(currentPrice);
        try {
            const response = await axios.post('http://localhost:3001/addSubscription', { cnp: cnp, subscription: subscription, price: currentPrice });
            console.log("Server response:", response.data);
        } catch (error) {
            console.error("Error sending CNP:", error);
        }
        
    }
    return (
    <div className="page-container">
      <div
          style={{
            position: "absolute",
            top: "63px",
            right: "50px",
            display: "flex",
            gap: "20px",
          }}
        >
          <button onClick={()=>redirecting("home")} style={{
            fontFamily: "Montserrat",
            fontWeight: 700,
            fontSize: "22.91px",
            lineHeight: "39.3px",
            letterSpacing: "-0.32px",
            background: "transparent",
            border: "none",
            color: "#AC3500",
            cursor: "pointer",
          }}>ACASĂ</button>
          <button onClick={()=>redirecting("services")} style={{
            fontFamily: "Montserrat",
            fontWeight: 700,
            fontSize: "22.91px",
            lineHeight: "39.3px",
            letterSpacing: "-0.32px",
            background: "transparent",
            border: "none",
            color: "#070707",
            cursor: "pointer",
          }}>SERVICII</button>
          <button onClick={()=>{ redirecting("clients")}} style={{
            fontFamily: "Montserrat",
            fontWeight: 700,
            fontSize: "22.91px",
            lineHeight: "39.3px",
            letterSpacing: "-0.32px",
            background: "transparent",
            border: "none",
            color: "#070707",
            cursor: "pointer",
          }}>CLINEȚI</button>
          <button onClick={()=>{redirecting("subscriptions")}} style={{
            fontFamily: "Montserrat",
            fontWeight: 700,
            fontSize: "22.91px",
            lineHeight: "39.3px",
            letterSpacing: "-0.32px",
            background: "transparent",
            border: "none",
            color: "#070707",
            cursor: "pointer",
          }}>ABONAMENTE</button>
        </div>

      <div className="cards-container">
        <div className="card">
          <div className="card-handle"></div>
          <div className="card-header">
            <div className="icon-circle icon-close">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <h2 className="card-title">Sală</h2>
            <div className="icon-circle icon-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <button onClick={()=>{setShowPopup(true); setSubscription("Sala"); setCurrentPrice(200)}} className="price-button">200 RON/MONTH</button>
          </div>
        </div>

        <div className="card">
          <div className="card-handle"></div>
          <div className="card-header">
            <div className="icon-circle icon-close">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <h2 className="card-title">Jogging</h2>
            <div className="icon-circle icon-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <button  onClick={()=>{setShowPopup(true); setSubscription("Jogging"); setCurrentPrice(150)}} className="price-button">150 RON/MONTH</button>
          </div>
        </div>

        <div className="card">
          <div className="card-handle"></div>
          <div className="card-header">
            <div className="icon-circle icon-close">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <h2 className="card-title">Saună</h2>
            <div className="icon-circle icon-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <button onClick={()=>{setShowPopup(true); setSubscription("Sauna"); setCurrentPrice(100)}} className="price-button">100 RON/MONTH</button>
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

          <h2>Introduceți CNP Client:</h2>

          <button onClick={sendData}  className="icon-btn primary">
            ↑
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          onChange={(value)=>setCnp(value.target.value)}
        />
      </div>
    </div>
      )}
    </div>
  );
};

