import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header.jsx";
import "../css/clients.css"; // Importăm stilul comun (Glassmorphism)

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Preluăm datele abonamentelor din server
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Presupunem că ai acest endpoint. Dacă nu, trebuie creat în backend.
        const response = await axios.get("http://localhost:3001/subscriptions");
        setSubscriptions(response.data);
      } catch (error) {
        console.error("Eroare la preluarea abonamentelor:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="app-wrapper">
      <Header />

      <div className="glass-container">
        {/* HEADER PANOU */}
        <div className="panel-header">
          <div className="panel-title-group">
            <h2 className="panel-title">Istoric Abonamente Vândute</h2>
            <p style={{ opacity: 0.6, fontSize: '14px', marginTop: '5px' }}>
              Lista completă a tranzacțiilor efectuate
            </p>
          </div>
          
          {/* Aici poți pune butoane de filtrare dacă dorești pe viitor */}
          <div className="panel-actions">
            <div className="stat-badge" style={{ 
                background: 'rgba(255,255,255,0.3)', 
                padding: '10px 20px', 
                borderRadius: '20px',
                fontWeight: 'bold',
                color: '#3b2b1f'
            }}>
              Total: {subscriptions.length}
            </div>
          </div>
        </div>

        {/* TABELUL TRANSPARENT ROTUNJIT */}
        <div className="glass-table-container" style={{ marginTop: '20px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>Se încarcă datele...</div>
          ) : subscriptions.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={styles.th}>CNP Client</th>
                  <th style={styles.th}>Tip Abonament</th>
                  <th style={styles.th}>Preț Standard</th>
                  <th style={styles.th}>Sumă Încasată</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub, index) => (
                  <tr key={index} style={styles.tr}>
                    <td style={styles.td}>{sub.cnp}</td>
                    <td style={styles.td}>
                      <span style={getBadgeStyle(sub.subscription)}>
                        {sub.subscription}
                      </span>
                    </td>
                    <td style={styles.td}>{sub.price} RON</td>
                    <td style={styles.td} className={sub.finalPrice < sub.price ? "danger-text" : ""}>
                      {sub.finalPrice} RON
                    </td>
                    <td style={styles.td}>
                        {sub.finalPrice >= sub.price ? (
                            <span style={{color: 'green', fontWeight: '800'}}>ACHITAT</span>
                        ) : (
                            <span style={{color: '#d9534f', fontWeight: '800'}}>RESTANT</span>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', opacity: 0.7 }}>
              Nu există abonamente vândute momentan.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Stiluri inline simple pentru a menține consistența cu clients.css
// (Acestea pot fi mutate în CSS dacă preferi)
const styles = {
  th: {
    textAlign: 'left',
    padding: '18px',
    color: 'rgba(59, 43, 31, 0.6)',
    textTransform: 'uppercase',
    fontSize: '12px',
    fontWeight: '800',
    borderBottom: '1px solid rgba(0,0,0,0.05)'
  },
  td: {
    padding: '18px',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    color: '#3b2b1f',
    fontWeight: '600',
    fontSize: '14px'
  },
  tr: {
    transition: 'background 0.2s'
  }
};

// Funcție mică pentru a colora eticheta abonamentului
const getBadgeStyle = (type) => {
  const base = {
    padding: '6px 12px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '800',
    textTransform: 'uppercase',
  };
  
  if (type === 'Sala') return { ...base, background: '#e3f2fd', color: '#1565c0' };
  if (type === 'Jogging') return { ...base, background: '#e8f5e9', color: '#2e7d32' };
  if (type === 'Sauna') return { ...base, background: '#fff3e0', color: '#ef6c00' };
  
  return base;
};