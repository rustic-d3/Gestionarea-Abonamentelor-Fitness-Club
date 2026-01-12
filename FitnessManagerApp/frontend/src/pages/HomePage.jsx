import React from "react";
import { useNavigate } from "react-router-dom";
import Background1 from "../assets/backgrounds/Background1.jpg";
import Header from '../components/Header.jsx';

const styles = {
  heroContainer: {
    backgroundImage: `url(${Background1})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex", 
    flexDirection: "column",
    padding: "0 10%", 
  },
  contentBox: {
    marginTop: "auto",
    marginBottom: "auto",
    maxWidth: "600px"
  },
  title: {
    fontFamily: "'Montserrat Subrayada', sans-serif",
    fontWeight: 700,
    fontSize: "clamp(30px, 5vw, 40px)", 
    color: "#070707",
    margin: 0,
    lineHeight: "1.1"
  },
  ctaButton: {
    marginTop: "30px",
    fontFamily: "'Montserrat Subrayada', sans-serif",
    backgroundColor: "#007aff",
    color: "#ffffff", 
    padding: "12px 35px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "transform 0.2s",
  }
};

export default function HomePage() {
  const navigate = useNavigate();

  const goTo = (route) => navigate(`/${route}`);

  return (
    <div style={styles.heroContainer}>
      <Header />

      <div style={styles.contentBox}>
        <h1 style={styles.title}>POLIGYM</h1>
        
        <div style={{ marginTop: "40px" }}>
          <h2 style={styles.title}>ELEVATE YOUR</h2>
          <h2 style={styles.title}>FITNESS JOURNEY</h2>
        </div>

        <div style={{ marginTop: "30px" }}>
          <p style={{ fontFamily: "Montserrat", fontWeight: 500, color: "#070707" }}>
            Alătură-te pentru o experiență unică alături de noi.
          </p>
        </div>

        <button 
          onClick={() => goTo("services")} 
          className="btn-ios-hero"
          style={{ marginTop: "30px" }} 
        >
          ÎNCEPE AZI!
        </button>
      </div>
    </div>
  );
}