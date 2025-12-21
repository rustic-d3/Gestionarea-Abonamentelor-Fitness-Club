import ClientsFullSubscriptionTable from "../components/ClinetsFullSubscribtionTable";
import Header from "../components/Header.jsx";
import { useState } from "react";
import axios from "axios";
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
    console.log("Sending data to server...");
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:3001/addClient",
        formData
      );
      console.log("Server response:", response.data);
    }catch (error) {
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
    <div>
      <Header></Header>
      <div
        style={{
          marginTop: "100px",
        }}
      >
        <ul>
          <li>
            <a href="/full-paid">Clienti fideli</a>
          </li>
          <li>
            <a href="/full-report">Raport detaliat</a>
          </li>
          <li>
            <a href="/good-clients">Clienti VIP</a>
          </li>
          <button onClick={() => setShowPopup(true)} className="btn">Adauga client</button>
        </ul>
        <ClientsFullSubscriptionTable></ClientsFullSubscriptionTable>
      </div>
      {showPopup && (
        <div className="overlay">
          <div className="popup form-wide">
            <div className="popup-header">
              <button className="icon-btn" onClick={() => setShowPopup(false)}>
                ✕
              </button>

              <h2>Înregistrare Client Nou</h2>

              <button onClick={sendData}  className="icon-btn primary" >
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
                onChange= {(e)=> setFormData({...formData, cnp: e.target.value})}
              />

              <div className="input-group">
                <input
                  name="nume"
                  type="text"
                  placeholder="Nume"
                  className="search-input"
                  onChange= {(e)=> setFormData({...formData, nume: e.target.value})}
                  
                />
                <input
                  name="prenume"
                  type="text"
                  placeholder="Prenume"
                  className="search-input"
                  onChange= {(e)=> setFormData({...formData, prenume: e.target.value})}
 
                />
              </div>

              <input
                name="adresa"
                type="text"
                placeholder="Adresa"
                className="search-input"
                onChange= {(e)=> setFormData({...formData, adresa: e.target.value})}

              />

              <input
                name="telefon"
                type="text"
                placeholder="Telefon"
                className="search-input"
                onChange= {(e)=> setFormData({...formData, telefon: e.target.value})}

              />

              <input
                name="disponibil"
                type="text"
                placeholder="Disponibilitate"
                className="search-input"
                onChange= {(e)=> setFormData({...formData, disponibil: e.target.value})}

              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
