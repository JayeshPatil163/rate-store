import { ThemeProvider } from './context/ThemeContext.jsx';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Layout from './components/layout/Layout.jsx';
import LandingPage from './pages/LandingPage.jsx';
import StoreListPage from './pages/StoreListPage.jsx';

function AppContent() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/stores');
    } else {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <LandingPage />
          </Layout>
        }
      />
      <Route
        path="/stores"
        element={
          user ? (
            <Layout>
              <StoreListPage />
            </Layout>
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="*"
        element={<Navigate to={user ? "/stores" : "/"} />}
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
