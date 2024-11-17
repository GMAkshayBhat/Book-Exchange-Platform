/**
 * @file App.js
 * @description Description of the file
 * @author G M Akshay Bhat
 * @created 01 19:33
 * @modified 01 19:33
 */


import React, { useState, useEffect,useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage'; // Import ProfilePage
import ResetPassword from './pages/ResetPassword'; // Adjust path as needed
import { AuthContext } from './utils/AuthContext'; // Import AuthContext

import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import PasswordResetPage from './pages/PasswordResetPage';
import RedirectHandler from './components/RedirectHandler'; // Import RedirectHandler
import ManageBookPage from './pages/ManageBookPage';

function App() {
  const { isLoggedIn } = useContext(AuthContext); // Access isLoggedIn from AuthContext
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const [isRegisterClicked, setIsRegisterClicked] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);  // Update search term in state
  };
  const handleLoginClick = () => setIsLoginClicked(true);
  const handleRegisterClick = () => setIsRegisterClicked(true);
  const resetLoginClick = () => setIsLoginClicked(false);
  const resetRegisterClick = () => setIsRegisterClicked(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      {/* Ensure redirection logic runs when the app loads */}
     
      <Navbar isAuthenticated={isLoggedIn} onSearch={handleSearch} onLoginClick={handleLoginClick}  onRegisterClick={handleRegisterClick}/>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route 
            path="/login" 
            element={<LoginPage 
              onLogin={() => console.log('Login triggered')} 
              isLoginClicked={isLoginClicked} 
              resetLoginClick={resetLoginClick} 
              isRegisterClicked={isRegisterClicked}
              resetRegisterClick={resetRegisterClick} 
            />} 
          />
       
        <Route path="/password-reset" element={<PasswordResetPage />} />
       
         <Route path="/home" element={ <HomePage handleSearch={handleSearch} /> } />
         <Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />} />
         <Route path="/manage-books" element={isLoggedIn ? <ManageBookPage /> : <Navigate to="/login" />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      
      </Routes>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Book Exchange Platform. All rights reserved.</p>
      </footer>
    </Router>
  );
}

export default App;
