// src/pages/AuthPage.js
import React, { useState, useContext } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext'; // Import AuthContext
import youCanWin from '../assets/images/youCanWin.webp'; // Import image
import Carousel from '../components/Carousel'; // Import the Carousel component
import '../assets/styles/Auth.css';
import axiosInstance from '../axiosInstance';
import ForgotPasswordModal from './PasswordResetPage'; // Import the modal

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // New field for registration
  const [message, setMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false); // State to handle expand/collapse
  const [isRegistering, setIsRegistering] = useState(false); // State to switch between login and registration
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false); // State to control modal visibility
  const { login } = useContext(AuthContext); // Access login function from AuthContext
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        // Registration request
       await axiosInstance.post('/auth/register', {
          email,
          password,
          username,
        });
        setMessage('Registration successful! Please log in.');
        setIsRegistering(false); // Switch to login view after registration
      } else {
        // Login request
        const response = await axiosInstance.post('/auth/login', {
          email,
          password,
        });
        login(response.data.token); // Set login state
        setMessage('Login successful!');
        navigate('/home'); // Redirect to the homepage after successful login
      }
    } catch (error) {
      setMessage(`Error: ${error.response ? error.response.data.message : 'Please try again.'}`);
    }
  };

  // Function to expand section and switch to registration view
  const handleJoinCommunity = () => {
    setIsExpanded(true);
    setIsRegistering(true); // Switch to registration form
  };
  const handleForgotPasswordClick = () => {
    setShowForgotPasswordModal(true); // Show the modal
  };
  return (
    <Container className="auth-container wrapper">
      <div className={`login-text ${isExpanded ? 'expand' : ''}`}>
        <button className="cta" onClick={() => setIsExpanded(!isExpanded)}>
          <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
        </button>
        <div className={`text ${isExpanded ? 'show-hide' : ''}`}>
          <h2>{isRegistering ? 'Register' : 'Login'}</h2>
          {message && (
            <Alert variant={message.includes('successful') ? 'success' : 'danger'}>
              {message}
            </Alert>
          )}
          <Form className="form-container" onSubmit={handleSubmit}>
            {isRegistering && (
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  // style={{padding:'150px'}}
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
            )}
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <div className="action-row">
    <Button variant="primary" type="submit" className="auth-button">
      {isRegistering ? 'Register' : 'Login'}
    </Button>
            <div>
    {!isRegistering && (
       <div className="forgot-password-link align-center">
       {/* <p> */}
         <span
           className="toggle-link"
           onClick={handleForgotPasswordClick} // Open the forgot password modal
         >
           Forgot password?
         </span>
       {/* </p> */}
     </div>
    )}
    </div>
  </div>
          </Form>

          {/* Toggle between Login and Register */}
          <div className="registration-prompt">
            {isRegistering ? (
              <p>
                Already have an account?{' '}
                <span className="toggle-link" onClick={() => setIsRegistering(false)}>
                  Login here
                </span>
              </p>
            ) : (
              <p>
                First time here?{' '}
                <span className="toggle-link" onClick={() => setIsRegistering(true)}>
                  Register for the community
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="call-text">
        <h2>
          "Welcome to the ultimate <br />
          <span> Book Exchange Platform</span>, <br />
          where readers unite to swap, lend, and discover their next great read!"
        </h2>
        <Button variant="secondary" onClick={handleJoinCommunity}>
          Join the Community
        </Button>
      </div>
      <div className="book-display image-scroller">
        {/* Display the book image carousel */}
        <Carousel /> {/* Embed the Carousel component here */}
      </div>
       {/* Forgot Password Modal */}
       <ForgotPasswordModal
        show={showForgotPasswordModal}
        handleClose={() => setShowForgotPasswordModal(false)} // Close modal
      />
    </Container>
  );
};

export default AuthPage;
