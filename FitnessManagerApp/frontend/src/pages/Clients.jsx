import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom"; 
import Header from "../components/Header.jsx";
import AllUsersTable from "../components/AllUsersTable";
import "../css/clients.css";

export default function Clients() {
  const [showPopup, setShowPopup] = useState(false);
  const [showBadClient, setShowBadClient] = useState(false);

  // State pentru datele formularului
  const [formData, setFormData] = useState({
    cnp: "",
    nume: "",
    prenume: "",
    adresa: "",
    telefon: "",
    disponibil: "",
  });

  // State pentru erorile de validare
  const [errors, setErrors] = useState({});

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
      console.error("Error fetching bad client data:", error);
    } finally {
      setLoadingBadClient(false);
    }
  };

  useEffect(() => {
    fetchBadClient();
  }, []);

  // --- LOGICA DE VALIDARE ---
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // 1. Validare CNP (fix 13 cifre)
    if (!formData.cnp || formData.cnp.length !== 13) {
      newErrors.cnp = "CNP-ul trebuie să aibă exact 13 cifre.";
      isValid = false;
    }

    // 2. Validare Nume (Doar litere)
    const nameRegex = /^[a-zA-ZăâîșțĂÂÎȘȚ\s-]+$/;
    if (!formData.nume || !nameRegex.test(formData.nume)) {
      newErrors.nume = "Doar litere permise.";
      isValid = false;
    }

    // 3. Validare Prenume (Doar litere)
    if (!formData.prenume || !nameRegex.test(formData.prenume)) {
      newErrors.prenume = "Doar litere permise.";
      isValid = false;
    }

    // 4. Validare Telefon (Minim 10 cifre)
    if (!formData.telefon || formData.telefon.length < 9) {
        newErrors.telefon = "Număr invalid (min 10 cifre).";
        isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNumericInput = (e, field) => {
    const value = e.target.value;
    const cleanValue = value.replace(/\D/g, ''); 
    setFormData({ ...formData, [field]: cleanValue });

    if (errors[field]) setErrors({ ...errors, [field]: null });
  };

  const handleTextInput = (e, field) => {
      setFormData({ ...formData, [field]: e.target.value });
      if (errors[field]) setErrors({ ...errors, [field]: null });
  }

  async function sendData() {
    if (!validateForm()) return;

    try {
      await axios.post("http://localhost:3001/addClient", formData);
      alert("Client adăugat cu succes!");
      setShowPopup(false);
      window.location.reload(); 
    } catch (error) {
      const errorMessage = error.response?.data?.details || "Eroare de rețea.";
      alert(errorMessage);
    }
  }

  return (
    <div className="app-wrapper">
      <Header />
      
      <div className="glass-container">
        <div className="panel-header">
          <div className="panel-title-group">
            <h2 className="panel-title">Gestiune Clienți</h2>
          </div>
          
          <div className="panel-actions">
            <button onClick={() => setShowPopup(true)} className="btn-add-ios">
              + ADAUGĂ CLIENT
            </button>
            <button onClick={() => setShowBadClient(true)} className="btn-warning-ios">
              CEL MAI RESTANT
            </button>
          </div>
        </div>

        <div className="report-tabs">
          <NavLink to="/full-paid">FIDELI</NavLink>
          <NavLink to="/full-report">RAPORT DETALIAT</NavLink>
          <NavLink to="/good-clients">VIP</NavLink>
        </div>
        
        <div className="glass-table-container">
          <AllUsersTable />
        </div>
      </div>

      {}
      {showPopup && (
        <div className="overlay">
          <div className="popup form-wide">
            <div className="popup-header">
              <button className="icon-btn" onClick={() => setShowPopup(false)}>✕</button>
              <h2>Înregistrare Client Nou</h2>
              <button onClick={sendData} className="icon-btn primary">↑</button>
            </div>

            <div className="form-container">
              {}
              <div>
                <input
                    placeholder="CNP (13 cifre)"
                    maxLength="13"
                    className={`search-input ${errors.cnp ? 'input-error' : ''}`}
                    value={formData.cnp}
                    onChange={(e) => handleNumericInput(e, 'cnp')}
                />
                {errors.cnp && <span className="error-msg">{errors.cnp}</span>}
              </div>

              <div className="input-group">
                {}
                <div style={{width: '100%'}}>
                    <input
                    placeholder="Nume"
                    className={`search-input ${errors.nume ? 'input-error' : ''}`}
                    value={formData.nume}
                    onChange={(e) => handleTextInput(e, 'nume')}
                    />
                    {errors.nume && <span className="error-msg">{errors.nume}</span>}
                </div>
                
                {}
                <div style={{width: '100%'}}>
                    <input
                    placeholder="Prenume"
                    className={`search-input ${errors.prenume ? 'input-error' : ''}`}
                    value={formData.prenume}
                    onChange={(e) => handleTextInput(e, 'prenume')}
                    />
                    {errors.prenume && <span className="error-msg">{errors.prenume}</span>}
                </div>
              </div>

              <input
                placeholder="Adresă"
                className="search-input"
                onChange={(e) => setFormData({ ...formData, adresa: e.target.value })}
              />

              {}
              <div>
                  <input
                    placeholder="Telefon"
                    maxLength="10"
                    className={`search-input ${errors.telefon ? 'input-error' : ''}`}
                    value={formData.telefon}
                    onChange={(e) => handleNumericInput(e, 'telefon')}
                  />
                  {errors.telefon && <span className="error-msg">{errors.telefon}</span>}
              </div>

              <input
                placeholder="Sold Disponibil (RON)"
                className="search-input"
                type="number"
                onChange={(e) => setFormData({ ...formData, disponibil: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}

      {}
      {showBadClient && (
        <div className="overlay">
          <div className="popup bad-client-alert">
             {}
             {}
             <div className="popup-header">
               <button className="icon-btn" onClick={() => setShowBadClient(false)}>✕</button>
               <h2 className="danger-text">Alertă Restanțe</h2>
               <div style={{width: '40px'}}></div>
            </div>
            <div className="alert-content">
              {loadingBadClient ? <p>Se încarcă...</p> : badClientData ? (
                <>
                  <h1 className="bad-client-name">{badClientData.nume} {badClientData.prenume}</h1>
                  <p>CNP: {badClientData.cnp}</p>
                  <p className="danger-text">Restanțe: {badClientData.numar_abonamente_neachitate}</p>
                </>
              ) : <p>Fără restanțe.</p>}
            </div>
             <button className="btn-close-ios" onClick={() => setShowBadClient(false)}>ÎNCHIDE</button>
          </div>
        </div>
      )}
    </div>
  );
}