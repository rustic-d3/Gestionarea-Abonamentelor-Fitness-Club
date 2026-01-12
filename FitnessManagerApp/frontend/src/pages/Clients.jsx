import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom"; 
import Header from "../components/Header.jsx";
import AllUsersTable from "../components/AllUsersTable";
import "../css/clients.css";

export default function Clients() {
  const [showPopup, setShowPopup] = useState(false);
  const [showBadClient, setShowBadClient] = useState(false);

  const [showRestModal, setShowRestModal] = useState(false);
  const [checkCnp, setCheckCnp] = useState("");
  const [checkService, setCheckService] = useState("Sala"); 
  const [restResult, setRestResult] = useState(null);

  const [formData, setFormData] = useState({
    cnp: "",
    nume: "",
    prenume: "",
    adresa: "",
    telefon: "",
    disponibil: "",
  });

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

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;
    if (!formData.cnp || formData.cnp.length !== 13) {
      newErrors.cnp = "CNP-ul trebuie să aibă exact 13 cifre.";
      isValid = false;
    }
    const nameRegex = /^[a-zA-ZăâîșțĂÂÎȘȚ\s-]+$/;
    if (!formData.nume || !nameRegex.test(formData.nume)) {
      newErrors.nume = "Doar litere permise.";
      isValid = false;
    }
    if (!formData.prenume || !nameRegex.test(formData.prenume)) {
      newErrors.prenume = "Doar litere permise.";
      isValid = false;
    }
    if (!formData.telefon || formData.telefon.length < 10) {
        newErrors.telefon = "Număr invalid (min 10 cifre).";
        isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleNumericInputFixed = (e, field) => {
    const value = e.target.value.replace(/\D/g, ''); 
    setFormData({ ...formData, [field]: value });
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

  const checkRestPayment = async () => {
    if (!checkCnp || checkCnp.length !== 13) {
        alert("CNP-ul introdus trebuie să aibă exact 13 cifre!");
        return;
    }
    
    try {
        const response = await axios.post("http://localhost:3001/checkChange", {
            cnp: checkCnp,
            serviciu: checkService
        });
        const data = response.data;
        
        if (Array.isArray(data) && data.length > 0) {
            const valoareRest = Object.values(data[0])[0];
            setRestResult(valoareRest);
        } else {
            setRestResult(data);
        }

    } catch (error) {
        console.error(error);
        alert("Eroare la verificare: " + (error.response?.data?.error || "Verifică datele introduse"));
    }
  };

  const handleRestCnpInput = (e) => {
      const val = e.target.value.replace(/\D/g, ''); 
      setCheckCnp(val);
  };

  return (
    <div className="app-wrapper">
      <Header />
      
      <div className="glass-container">
        <div className="panel-header">
          <div className="panel-title-group">
            <h2 className="panel-title">Gestiune Clienți</h2>
          </div>
          
          <div className="panel-actions">
            <button 
                onClick={() => setShowRestModal(true)} 
                className="btn-warning-ios" 
                style={{marginRight: '10px', background: '#3b2b1f'}}
            >
                CALCUL REST 
            </button>

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

      {showPopup && (
        <div className="overlay">
          <div className="popup form-wide">
            <div className="popup-header">
              <button className="icon-btn" onClick={() => setShowPopup(false)}>✕</button>
              <h2>Înregistrare Client Nou</h2>
              <button onClick={sendData} className="icon-btn primary">↑</button>
            </div>

            <div className="form-container">
              <div>
                <input
                    placeholder="CNP (13 cifre)"
                    maxLength="13"
                    className={`search-input ${errors.cnp ? 'input-error' : ''}`}
                    value={formData.cnp}
                    onChange={(e) => handleNumericInputFixed(e, 'cnp')}
                />
                {errors.cnp && <span className="error-msg">{errors.cnp}</span>}
              </div>

              <div className="input-group">
                <div style={{width: '100%'}}>
                    <input
                    placeholder="Nume"
                    className={`search-input ${errors.nume ? 'input-error' : ''}`}
                    value={formData.nume}
                    onChange={(e) => handleTextInput(e, 'nume')}
                    />
                    {errors.nume && <span className="error-msg">{errors.nume}</span>}
                </div>
                
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

              <div>
                  <input
                    placeholder="Telefon"
                    maxLength="10"
                    className={`search-input ${errors.telefon ? 'input-error' : ''}`}
                    value={formData.telefon}
                    onChange={(e) => handleNumericInputFixed(e, 'telefon')}
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

      {showRestModal && (
        <div className="overlay">
          <div className="popup" style={{maxWidth: '400px'}}>
            <div className="popup-header">
               <button className="icon-btn" onClick={() => {setShowRestModal(false); setRestResult(null); setCheckCnp("");}}>✕</button>
               <h2>Verificare Restanță (SQL)</h2>
               <div style={{width: '40px'}}></div>
            </div>

            <div className="form-container">
                <label style={{fontSize: '12px', fontWeight: 'bold', marginLeft: '10px'}}>CNP Client:</label>
                
                <input 
                    className="search-input" 
                    placeholder="Introdu CNP (13 cifre)" 
                    value={checkCnp}
                    onChange={handleRestCnpInput} 
                    maxLength="13"                
                />

                <label style={{fontSize: '12px', fontWeight: 'bold', marginLeft: '10px'}}>Serviciu:</label>
                <select 
                    className="search-input"
                    value={checkService}
                    onChange={(e) => setCheckService(e.target.value)}
                >
                    <option value="Sala">Sala</option>
                    <option value="Jogging">Jogging</option>
                    <option value="Sauna">Sauna</option>
                </select>

                <button onClick={checkRestPayment} className="btn-add-ios" style={{width: '100%', marginTop: '10px'}}>
                    CALCULEAZĂ
                </button>

                {restResult !== null && (
                    <div style={{marginTop: '20px', textAlign: 'center', padding: '15px', background: 'rgba(255,255,255,0.5)', borderRadius: '15px'}}>
                        <span style={{display: 'block', fontSize: '12px', fontWeight: '700'}}>REST DE PLATĂ:</span>
                        <span style={{fontSize: '24px', fontWeight: '900', color: restResult > 0 ? '#d9534f' : 'green'}}>
                            {restResult} RON
                        </span>
                        <p style={{fontSize: '10px', marginTop: '5px'}}>*Valoare returnată direct de funcția SQL</p>
                    </div>
                )}
            </div>
          </div>
        </div>
      )}

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
                <div style={{padding: '20px', textAlign: 'center'}}>Se încarcă datele...</div>
              ) : badClientData ? (
                <>
                  <div className="client-identity" style={{textAlign: 'center', marginBottom: '20px'}}>
                    <span style={{opacity: 0.6, fontSize: '12px', fontWeight: '800', textTransform: 'uppercase'}}>
                      Cel mai restant client
                    </span>
                    <h1 className="bad-client-name" style={{margin: '5px 0', fontSize: '26px'}}>
                      {badClientData.nume} {badClientData.prenume}
                    </h1>
                    <p style={{fontWeight: '600', opacity: 0.8}}>CNP: {badClientData.cnp}</p>
                  </div>

                  <div style={{display: 'flex', justifyContent: 'center', marginBottom: '25px'}}>
                    <div style={{background: 'rgba(217, 83, 79, 0.1)', padding: '15px 25px', borderRadius: '15px', textAlign: 'center'}}>
                      <span style={{color: '#d9534f', fontSize: '32px', fontWeight: '900', display: 'block', lineHeight: '1'}}>
                        {badClientData.numar_abonamente_neachitate}
                      </span>
                      <span style={{color: '#d9534f', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase'}}>
                        Abonamente Neachitate
                      </span>
                    </div>
                  </div>

                  <div className="progress-section" style={{marginTop: '10px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: '700', marginBottom: '8px', fontSize: '14px'}}>
                      <span>Procent Achitat din Total:</span>
                      <span>{badClientData.procent_platit || 0}%</span>
                    </div>
                    
                    <div className="progress-bar-container" style={{height: '12px', background: 'rgba(0,0,0,0.1)', borderRadius: '10px', overflow: 'hidden'}}>
                      <div 
                        className="progress-bar-fill" 
                        style={{ 
                          width: `${badClientData.procent_platit || 0}%`,
                          height: '100%',
                          background: 'linear-gradient(90deg, #ff4e00, #d9534f)',
                          transition: 'width 1s ease-in-out'
                        }}
                      ></div>
                    </div>
                  </div>
                </>
              ) : (
                <p style={{textAlign: 'center', padding: '20px'}}>Nu s-au găsit clienți cu restanțe.</p>
              )}
            </div>
            
            <button className="btn-close-ios" onClick={() => setShowBadClient(false)}>
              ÎNCHIDE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}