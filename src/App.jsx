import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import PrintCheque from './pages/PrintCheque';
import BatchPrint from './pages/BatchPrint';
import History from './pages/History';
import Templates from './pages/Templates';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-8">
        <Routes>
          <Route path="/" element={<Navigate to="/print" replace />} />
          <Route path="/print" element={<PrintCheque />} />
          <Route path="/batch" element={<BatchPrint />} />
          <Route path="/history" element={<History />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}
