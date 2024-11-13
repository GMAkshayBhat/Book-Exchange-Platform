// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage'; // Import ProfilePage
import ResetPassword from './pages/ResetPassword'; // Adjust path as needed


import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import PasswordResetPage from './pages/PasswordResetPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/password-reset" element={<PasswordResetPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" replace />} />
      </Routes>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Book Exchange Platform. All rights reserved.</p>
      </footer>
    </Router>
  );
}

export default App;
