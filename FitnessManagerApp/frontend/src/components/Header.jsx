import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Header.css';

export default function Header() {
  return (
    <nav className="header-nav">
      <div className="nav-container">
        {/* Folosim NavLink pentru a nu da refresh la pagină și pentru clasa 'active' */}
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          ACASĂ
        </NavLink>
        <NavLink to="/services" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          SERVICII
        </NavLink>
        <NavLink to="/clients" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          CLIENȚI
        </NavLink>
        <NavLink to="/subscriptions" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          ABONAMENTE
        </NavLink>
      </div>
    </nav>
  );
}