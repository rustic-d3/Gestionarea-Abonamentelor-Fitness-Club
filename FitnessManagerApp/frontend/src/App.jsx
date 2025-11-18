import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import Clients from './pages/Clients';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default page */}
        <Route path="/" element={<HomePage />} />

        {/* Other pages */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/clients" element={<Clients />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
