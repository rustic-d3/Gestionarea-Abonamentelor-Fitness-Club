import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom"; 
import Header from "../components/Header.jsx";
import AllUsersTable from "../components/AllUsersTable";
import "../css/clients.css";

export default function Clients() {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [showBadClient, setShowBadClient] = useState(false);
  const [formData, setFormData] = useState({
    cnp: "", nume: "", prenume: "", adresa: "", telefon: "", disponibil: ""
  });
  const [formData2, setFormData2] = useState({
    cnp: "", serviciu: ""
  });
  const [badClientData, setBadClientData] = useState(null);
  const [loadingBadClient, setLoadingBadClient] = useState(false);

  const fetchBadClient = async () => {
    setLoadingBadClient(true);
    try {
      const response = await axios.get("http://localhost:3001/bad-client");
      if (response.data && response.data.length > 0) {
        setBadClientData(response.data[0]);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoadingBadClient(false);
    }
  };

  useEffect(() => { fetchBadClient(); }, []);

  async function sendData() {
    try {
      await axios.post("http://localhost:3001/addClient", formData);
      alert("Client adăugat cu succes!");
      setShowPopup(false);
      window.location.reload(); 
    } catch (error) {
      alert(error.response?.data?.details || "Eroare.");
    }
  }

  async function sendData2() {
    try {
      const response = await axios.post("http://localhost:3001/checkChange", formData2);
      console.log(response.data);
      alert(`Rest de plată: ${response.data[0]?.rest_de_plata || 0}`);
      setShowPopup2(false);
    } catch (error) {
      alert(error.response?.data?.details || "Eroare.");
    }
  }

  return (
    <div className="app-wrapper">
      <Header />
      
      <div className="glass-container">
        <div className="panel-header">
          <h2 className="panel-title">Gestiune Clienți</h2>
          <div className="panel-actions">
            <button onClick={() => setShowPopup(true)} className="btn-add-ios">+ ADAUGĂ CLIENT</button>
            <button onClick={() => setShowBadClient(true)} className="btn-warning-ios">CEL MAI RESTANT</button>
            <button onClick={() => setShowPopup2(true)} className="btn-warning-ios">VERIFICARE REST PLATA</button>
          </div>
        </div>

        <div className="report-tabs">
          <NavLink to="/full-paid">FIDELI</NavLink>
          <NavLink to="/full-report">RAPORT DETALIAT</NavLink>
          <NavLink to="/good-clients">VIP</NavLink>
          
        </div>
        
        {/* CONTAINER PENTRU TABEL CA SĂ NU MAI FIE ALB */}
        <div className="glass-table-container">
          <AllUsersTable />
        </div>
      </div>

      {/* MODAL ADAUGARE CLIENT */}
      {showPopup && (
        <div className="overlay">
          <div className="popup form-wide">
            <div className="popup-header">
              <button className="icon-btn" onClick={() => setShowPopup(false)}>✕</button>
              <h2>Înregistrare Client</h2>
              <button onClick={sendData} className="icon-btn primary">↑</button>
            </div>
            <div className="form-container">
              <input placeholder="CNP" className="search-input" onChange={(e) => setFormData({ ...formData, cnp: e.target.value })} />
              <div className="input-group">
                <input placeholder="Nume" className="search-input" onChange={(e) => setFormData({ ...formData, nume: e.target.value })} />
                <input placeholder="Prenume" className="search-input" onChange={(e) => setFormData({ ...formData, prenume: e.target.value })} />
              </div>
              <input placeholder="Adresă" className="search-input" onChange={(e) => setFormData({ ...formData, adresa: e.target.value })} />
              <input placeholder="Telefon" className="search-input" onChange={(e) => setFormData({ ...formData, telefon: e.target.value })} />
              <input placeholder="Disponibil" className="search-input" type="number" onChange={(e) => setFormData({ ...formData, disponibil: e.target.value })} />
            </div>
          </div>
        </div>
      )}
      {showPopup2 && (
        <div className="overlay">
          <div className="popup form-wide">
            <div className="popup-header">
              <button className="icon-btn" onClick={() => setShowPopup2(false)}>✕</button>
              <h2>Verificare Restanțe</h2>
              <button onClick={sendData2} className="icon-btn primary">↑</button>
            </div>
            <div className="form-container">
              <input placeholder="CNP" className="search-input" onChange={(e) => setFormData2({ ...formData2, cnp: e.target.value })} />
              <div className="input-group">
                <input placeholder="Serviciu" className="search-input" onChange={(e) => setFormData2({ ...formData2, serviciu: e.target.value })} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ALERTĂ RESTANȚIER */}
      {showBadClient && (
        <div className="overlay">
          <div className="popup bad-client-alert">
            <div className="popup-header">
               <button className="icon-btn" onClick={() => setShowBadClient(false)}>✕</button>
               <h2 className="danger-text">Alertă Restanțe</h2>
               <div style={{width: '40px'}}></div>
            </div>
            
            <div className="alert-content">
              {loadingBadClient ? (
                <p>Se încarcă...</p>
              ) : badClientData ? (
                <>
                  <div className="client-identity">
                    <span className="identity-label">CEL MAI RESTANT CLIENT:</span>
                    <h1 className="bad-client-name">{badClientData.nume} {badClientData.prenume}</h1>
                    <p className="cnp-sub">CNP: {badClientData.cnp}</p>
                  </div>
                  <div className="progress-section">
                    <div className="progress-labels">
                      <span>Achitat:</span>
                      <span>{badClientData.procent_platit}%</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill" style={{ width: `${badClientData.procent_platit}%` }}></div>
                    </div>
                  </div>
                </>
              ) : <p>Fără restanțe.</p>}
            </div>
            
            {/* BUTONUL REPARAT AICI */}
            <button className="btn-close-ios" onClick={() => setShowBadClient(false)}>
              ÎNCHIDE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}