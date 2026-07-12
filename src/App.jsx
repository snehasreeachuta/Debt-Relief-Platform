import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import SettlementPredictor from './pages/SettlementPredictor';
import LetterGenerator from './pages/LetterGenerator';
import HistoryPage from './pages/HistoryPage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorage = () => setIsAuthenticated(!!localStorage.getItem('token'));
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loans'); // Clear loans on logout
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <BrowserRouter>
        {isAuthenticated && <Navbar onLogout={handleLogout} />}
        
        <Routes>
          {/* If authenticated, show Dashboard. If not, show Login. */}
          <Route path="/" element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
          } />
          
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <AuthPage onLoginSuccess={() => setIsAuthenticated(true)} />} />
          <Route path="/predictor" element={isAuthenticated ? <SettlementPredictor /> : <Navigate to="/login" />} />
          <Route path="/generator" element={isAuthenticated ? <LetterGenerator /> : <Navigate to="/login" />} />
          <Route path="/history" element={isAuthenticated ? <HistoryPage /> : <Navigate to="/login" />} />
          
          {/* Fallback for bad URLs */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}