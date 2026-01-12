import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Header from "../components/Header.jsx";
import ClientsFullSubscriptionTable from "../components/ClinetsFullSubscribtionTable";
import "../css/clients.css"; 

export default function FullPaidClients() {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    cnp: "",
    nume: "",
    prenume: "",
    adresa: "",
    telefon: "",
    disponibil: "",
  });

  async function sendData() {
    try {
      const response = await axios.post("http://localhost:3001/addClient", formData);
      alert("Client adăugat cu succes!");
      setShowPopup(false); 
      window.location.reload(); 
    } catch (error) {
      const errorMessage = error.response?.data?.details || "Eroare la server.";
      alert(errorMessage);
    }
  }

  return (
    <div className="app-wrapper">
      <Header />
      
      <div className="glass-container">
        {}
        <div className="report-tabs">
          <NavLink to="/full-paid" className={({ isActive }) => isActive ? "tab-active" : ""}>
            Clienți Fideli
          </NavLink>
          <NavLink to="/full-report">Raport Detaliat</NavLink>
          <NavLink to="/good-clients">Clienți VIP</NavLink>
          <button onClick={() => setShowPopup(true)} className="btn-add-ios">
            + Adaugă Client
          </button>
        </div>

        <div className="panel-header">
            <h2 className="panel-title">Abonamente Achitate Integral</h2>
        </div>

        <ClientsFullSubscriptionTable />
      </div>

      {}
      {showPopup && (
        <div className="overlay">
          <div className="popup form-wide">
            <div className="popup-header">
              <button className="icon-btn" onClick={() => setShowPopup(false)}>✕</button>
              <h2>Înregistrare Client</h2>
              <button onClick={sendData} className="icon-btn primary">↑</button>
            </div>

            <div className="form-container">
              <input
                placeholder="CNP (13 cifre)"
                maxLength="13"
                className="search-input"
                onChange={(e) => setFormData({ ...formData, cnp: e.target.value })}
              />
              <div className="input-group">
                <input
                  placeholder="Nume"
                  className="search-input"
                  onChange={(e) => setFormData({ ...formData, nume: e.target.value })}
                />
                <input
                  placeholder="Prenume"
                  className="search-input"
                  onChange={(e) => setFormData({ ...formData, prenume: e.target.value })}
                />
              </div>
              <input
                placeholder="Adresă Completă"
                className="search-input"
                onChange={(e) => setFormData({ ...formData, adresa: e.target.value })}
              />
              <input
                placeholder="Telefon"
                className="search-input"
                onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
              />
              <input
                placeholder="Sold Disponibil (RON)"
                type="number"
                className="search-input"
                onChange={(e) => setFormData({ ...formData, disponibil: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}