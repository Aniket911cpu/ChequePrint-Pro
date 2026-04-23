import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import PrintCheque from './pages/PrintCheque';
import BatchPrint from './pages/BatchPrint';
import History from './pages/History';
import Templates from './pages/Templates';
import Settings from './pages/Settings';
import Pricing from './pages/Pricing';
import Systems from './pages/Systems';
import Auth from './pages/Auth';

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user_session');
    return saved ? JSON.parse(saved) : null;
  });
  
  const location = useLocation();

  const handleLogin = (userData) => {
    localStorage.setItem('user_session', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user_session');
    setUser(null);
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      <Sidebar onLogout={handleLogout} user={user} />
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-8 scroll-smooth">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/print" element={<PrintCheque />} />
            <Route path="/batch" element={<BatchPrint />} />
            <Route path="/history" element={<History />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/systems" element={<Systems />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
