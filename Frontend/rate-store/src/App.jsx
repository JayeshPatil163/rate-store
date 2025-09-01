import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Layout from './components/layout/Layout.jsx';
import LandingPage from './pages/LandingPage.jsx';

function AppContent() {
  const { user } = useAuth();

  return (
    <Routes>
      {user ? (
        <Route path="/" element={<Layout><LandingPage /></Layout>} />
      ) : (
        <Route path="/dashboard" element={<Layout><div>Welcome, {user.name}!</div></Layout>} />
      )}
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;