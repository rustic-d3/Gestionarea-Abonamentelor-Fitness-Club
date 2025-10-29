import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import Clients from './pages/Clients';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/clients" element={<Clients />} />
            
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
