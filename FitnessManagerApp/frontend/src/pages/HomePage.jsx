import React from "react";
import Background1 from "../assets/backgrounds/Background1.jpg"; // check your path

export default function HomePage() {
  return (
    <>
      {/* Full-page background */}
      <div
        style={{
            backgroundImage: `url(${Background1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
            position: "relative",
            padding: "0 50px",
        }}
      >
        {/* Top-right nav buttons */}
        <div
          style={{
            position: "absolute",
            top: "63px",
            right: "50px",
            display: "flex",
            gap: "20px",
          }}
        >
          <button style={{
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
          <button style={{
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
          <button style={{
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
          <button style={{
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

        {/* Left side titles */}
        <div style={{ position: "absolute", top: "208px", left: "151px" }}>
          <h1 style={{
            fontFamily: "Montserrat Subrayada",
            fontWeight: 700,
            fontSize: "40px",
            lineHeight: "39.3px",
            letterSpacing: "-0.32px",
            color: "#070707",
            margin: 0
          }}>POLIGYM</h1>

          <div style={{ marginTop: "130px" }}>
            <h2 style={{
              fontFamily: "Montserrat Subrayada",
              fontWeight: 700,
              fontSize: "40px",
              lineHeight: "39.3px",
              letterSpacing: "-0.32px",
              color: "#070707",
              margin: 0
            }}>ELEVATE YOUR</h2>
            <h2 style={{
              fontFamily: "Montserrat Subrayada",
              fontWeight: 700,
              fontSize: "40px",
              lineHeight: "39.3px",
              letterSpacing: "-0.32px",
              color: "#070707",
              margin: 0
            }}>FITNESS JOURNEY</h2>
          </div>

          <div style={{ marginTop: "60px" }}>
            <p style={{
              fontFamily: "Montserrat",
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "27px",
              letterSpacing: "-0.32px",
              color: "#070707",
              margin: 0
            }}>Alătură-te pentru o experință</p>
            <p style={{
              fontFamily: "Montserrat",
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "27px",
              letterSpacing: "-0.32px",
              color: "#070707",
              margin: 0
            }}>unică alături de noi.</p>
          </div>

          <button style={{
            marginTop: "30px",
            fontFamily: "Montserrat Subrayada",
            fontWeight: 400,
            fontSize: "17px",
            lineHeight: "20px",
            letterSpacing: "-0.32px",
            backgroundColor: "#007aff",
            color: "#070707",
            padding: "10px 30px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}>ÎNCEPE AZI!</button>
        </div>
      </div>
    </>
  );
}
