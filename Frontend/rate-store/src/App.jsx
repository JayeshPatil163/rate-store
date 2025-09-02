import { ThemeProvider } from './context/ThemeContext.jsx';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Layout from './components/layout/Layout.jsx';
import LandingPage from './pages/LandingPage.jsx';
import StoreListPage from './pages/StoreListPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import StoreOwnerDashboard from './pages/StoreOwnerDashboard.jsx';

function AppContent() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'System_Administrator') {
      navigate('/admin');
    } else if (user?.role === 'Normal_User') {
      navigate('/normal-user');
    } else if (user?.role === 'Store_Owner') {
      navigate('/store');
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
        path="/store" 
        element={
          user ? (
            <Layout>
              <StoreOwnerDashboard />
            </Layout>
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/admin"
        element={
          user ? (
            <Layout>
              <AdminDashboard />
            </Layout>
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/normal-user"
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
