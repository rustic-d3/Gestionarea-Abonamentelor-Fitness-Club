import React from 'react'
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
  function redirecting(route) {
    switch (route) {
      case "clients":
        navigate("/clients");
        break;
      case "home":
        navigate("/home");
        break; 
      case "services":
        navigate("/services");
        break;
      case "subscriptions":
        navigate("/subscriptions");
        break;
      default:
        navigate("/sdf");
    }
}
  return (
        <div
        style={{
          position: "absolute",
          top: "63px",
          right: "50px",
          display: "flex",
          gap: "20px",
        }}
      >
        <button
          onClick={() => redirecting("home")}
          style={{
            fontFamily: "Montserrat",
            fontWeight: 700,
            fontSize: "22.91px",
            lineHeight: "39.3px",
            letterSpacing: "-0.32px",
            background: "transparent",
            border: "none",
            color: "#AC3500",
            cursor: "pointer",
          }}
        >
          ACASĂ
        </button>
        <button
          onClick={() => redirecting("services")}
          style={{
            fontFamily: "Montserrat",
            fontWeight: 700,
            fontSize: "22.91px",
            lineHeight: "39.3px",
            letterSpacing: "-0.32px",
            background: "transparent",
            border: "none",
            color: "#070707",
            cursor: "pointer",
          }}
        >
          SERVICII
        </button>
        <button
          onClick={() => {
            redirecting("clients");
          }}
          style={{
            fontFamily: "Montserrat",
            fontWeight: 700,
            fontSize: "22.91px",
            lineHeight: "39.3px",
            letterSpacing: "-0.32px",
            background: "transparent",
            border: "none",
            color: "#070707",
            cursor: "pointer",
          }}
        >
          CLINEȚI
        </button>
        <button
          onClick={() => {
            redirecting("subscriptions");
          }}
          style={{
            fontFamily: "Montserrat",
            fontWeight: 700,
            fontSize: "22.91px",
            lineHeight: "39.3px",
            letterSpacing: "-0.32px",
            background: "transparent",
            border: "none",
            color: "#070707",
            cursor: "pointer",
          }}
        >
          ABONAMENTE
        </button>
      </div>
  )
}
