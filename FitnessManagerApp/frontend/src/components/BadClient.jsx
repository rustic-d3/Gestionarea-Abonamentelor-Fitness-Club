import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function BadClient() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/bad-client');
                // Luăm primul element din listă (cel mai restant client)
                setData(response.data[0]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <p style={{ color: '#fff' }}>Se încarcă datele restanțierului...</p>;
    if (!data) return <p style={{ color: '#fff' }}>Nu există clienți cu restanțe.</p>;

    return (
        <div className="bad-client-card">
            <div className="bad-client-header">
                <span className="alert-badge">Alertă Restanțe</span>
                <h3>{data.nume} {data.prenume}</h3>
                <p className="cnp-text">CNP: {data.cnp}</p>
            </div>

            <div className="bad-client-stats">
                <div className="stat-item">
                    <span className="stat-label">Abonamente Neachitate</span>
                    <span className="stat-value">{data.numar_abonamente_neachitate}</span>
                </div>

                <div className="progress-section">
                    <div className="progress-info">
                        <span>Procent achitat din total</span>
                        <span>{data.procent_platit}%</span>
                    </div>
                    <div className="progress-bar-container">
                        <div 
                            className="progress-bar-fill" 
                            style={{ width: `${data.procent_platit}%` }}
                        ></div>
                    </div>
                </div>
            </div>
            
            <p className="footer-note">* Date calculate automat conform istoricului de plăți.</p>
        </div>
    );
}