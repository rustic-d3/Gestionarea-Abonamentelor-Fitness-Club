import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import Clients from './pages/Clients';
import FullPaidClients from './pages/FullPaidClients';
import FullReportPage from './pages/FullReportPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/full-paid" element={<FullPaidClients />} />
          <Route path="/full-report" element={<FullReportPage />} />
            
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
