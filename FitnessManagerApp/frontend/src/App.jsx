import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import Clients from './pages/Clients';
import FullPaidClients from './pages/FullPaidClients';
import FullReportPage from './pages/FullReportPage';
import Services from './pages/Services';
import Subscriptions from './pages/Subscriptions';
import GoodClientsPage from './pages/GoodClientsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default page */}
        <Route path="/" element={<HomePage />} />

        {/* Other pages */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/full-paid" element={<FullPaidClients />} />
        <Route path="/full-report" element={<FullReportPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/good-clients" element={<GoodClientsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
