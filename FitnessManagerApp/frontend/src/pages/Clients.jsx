import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header.jsx";
import AllUsersTable from "../components/AllUsersTable";
import "../css/clients.css";

export default function Clients() {
  // Modal Visibility States
  const [showPopup, setShowPopup] = useState(false);
  const [showBadClient, setShowBadClient] = useState(false);

  // Form Data State
  const [formData, setFormData] = useState({
    cnp: "",
    nume: "",
    prenume: "",
    adresa: "",
    telefon: "",
    disponibil: "",
  });

  // Data States
  const [badClientData, setBadClientData] = useState(null);
  const [loadingBadClient, setLoadingBadClient] = useState(false);

  // Fetch the "Bad Client" data on component mount
  const fetchBadClient = async () => {
    setLoadingBadClient(true);
    try {
      const response = await axios.get("http://localhost:3001/bad-client");
      setBadClientData(response.data);
    } catch (error) {
      console.error("Error fetching bad client data:", error);
    } finally {
      setLoadingBadClient(false);
    }
  };

  useEffect(() => {
    fetchBadClient();
  }, []);

  // Submit New Client
  async function sendData() {
    console.log("Sending data to server...", formData);
    try {
      const response = await axios.post(
        "http://localhost:3001/addClient",
        formData
      );
      console.log("Server response:", response.data);
      alert("Client adăugat cu succes!");
      setShowPopup(false);
      // Optional: window.location.reload() to refresh the table
    } catch (error) {
      console.error("Error sending data:", error);
      if (error.response) {
        const errorMessage =
          error.response.data.details || error.response.data.error;
        alert(errorMessage);
      } else {
        alert("Eroare de rețea. Serverul nu a putut fi contactat.");
      }
    }
  }

  return (
    <>
      <Header />
      <div style={{ marginTop: "100px" }}>
        <ul className="client-nav-list">
          <li>
            <a href="/full-paid">Clienti fideli</a>
          </li>
          <li>
            <a href="/full-report">Raport detaliat</a>
          </li>
          <li>
            <a href="/good-clients">Clienti VIP</a>
          </li>
          <button onClick={() => setShowPopup(true)} className="btn">
            Adauga client
          </button>
          <button onClick={() => setShowBadClient(true)} className="btn danger-btn">
            Cel mai restant client
          </button>
        </ul>
        
        <AllUsersTable />
      </div>

      {/* MODAL: ADD NEW CLIENT */}
      {showPopup && (
        <div className="overlay">
          <div className="popup form-wide">
            <div className="popup-header">
              <button className="icon-btn" onClick={() => setShowPopup(false)}>
                ✕
              </button>
              <h2>Înregistrare Client Nou</h2>
              <button onClick={sendData} className="icon-btn primary">
                ↑
              </button>
            </div>

            <div className="form-container">
              <input
                name="cnp"
                type="text"
                maxLength="13"
                placeholder="CNP"
                className="search-input"
                onChange={(e) => setFormData({ ...formData, cnp: e.target.value })}
              />
              <div className="input-group">
                <input
                  name="nume"
                  type="text"
                  placeholder="Nume"
                  className="search-input"
                  onChange={(e) => setFormData({ ...formData, nume: e.target.value })}
                />
                <input
                  name="prenume"
                  type="text"
                  placeholder="Prenume"
                  className="search-input"
                  onChange={(e) => setFormData({ ...formData, prenume: e.target.value })}
                />
              </div>
              <input
                name="adresa"
                type="text"
                placeholder="Adresa"
                className="search-input"
                onChange={(e) => setFormData({ ...formData, adresa: e.target.value })}
              />
              <input
                name="telefon"
                type="text"
                placeholder="Telefon"
                className="search-input"
                onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
              />
              <input
                name="disponibil"
                type="text"
                placeholder="Disponibilitate"
                className="search-input"
                onChange={(e) => setFormData({ ...formData, disponibil: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}

      {/* MODAL: BAD CLIENT INFO */}
      {showBadClient && (
        <div className="overlay">
          <div className="popup form-wide" style={{ textAlign: "center" }}>
            <div className="popup-header">
               <button className="icon-btn" onClick={() => setShowBadClient(false)}>
                ✕
              </button>
              <h2 style={{ color: "#d9534f" }}>Atenție: Restanțe Mari</h2>
              <div style={{ width: "40px" }}></div> {/* Spacer */}
            </div>
            
            <div style={{ padding: "20px" }}>
              {loadingBadClient ? (
                <p>Se încarcă datele...</p>
              ) : badClientData ? (
                <>
                  <p style={{ fontSize: "1.2rem" }}>
                    Clientul cu cele mai multe restanțe este:
                  </p>
                  <h1 style={{ margin: "10px 0" }}>
                    {badClientData[0].nume} {badClientData[0].prenume}
                  </h1>
                  <p><strong>CNP:</strong> {badClientData[0].cnp}</p>
                  <p><strong>Numar de abonamente neachitate:</strong> {badClientData[0].numar_abonamente_neachitate}</p>
                  <p><strong>Procent platit:</strong> {badClientData[0].procent_platit}%</p>
                  
                </>
              ) : (
                <p>Nu s-au găsit clienți cu restanțe.</p>
              )}
            </div>
            
            <button className="btn" onClick={() => setShowBadClient(false)}>
              Închide
            </button>
          </div>
        </div>
      )}
    </>
  );
}