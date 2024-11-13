// // PasswordResetPage.js
// import React, { useState } from 'react';
// import { Container, Form, Button, Alert } from 'react-bootstrap';
// import axiosInstance from '../axiosInstance'; // Using the axios instance
// import '../assets/styles/Auth.css'; // Import Auth.css

// const PasswordResetPage = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axiosInstance.post('/auth/forgot-password', { email });
//       setMessage(response.data.message); // Server response message
//     } catch (error) {
//       setMessage('Failed to send reset link. Please try again.');
//     }
//   };

//   return (
//     <Container className="auth-container">
//       <h2>Reset Password</h2>
//       {message && <Alert variant={message.includes('sent') ? 'success' : 'danger'}>{message}</Alert>}
//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="formEmail">
//           <Form.Label>Email address</Form.Label>
//           <Form.Control 
//             type="email" 
//             placeholder="Enter email" 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
//             required 
//           />
//         </Form.Group>

//         <Button variant="primary" type="submit" className="auth-button">
//           Send Reset Link
//         </Button>
//       </Form>
//     </Container>
//   );
// };

// export default PasswordResetPage;
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const ForgotPasswordModal = ({ show, handleClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage('Password reset link sent to your email.');
      
      // Set a timeout to close the modal automatically after 1 minute (60000 ms)
      setTimeout(() => {
        handleClose();
      }, 5000);
    } catch (error) {
      // If the server sends an error response, display it
  if (error.response && error.response.data && error.response.data.error) {
    setMessage(error.response.data.error);
  } else {
    // Fallback message if there is no response data
    setMessage('Failed to send reset link. Please try again.');
  }
    } finally {
      setIsLoading(false);
    }
  };

  // Reset email and message when the modal is closed
  useEffect(() => {
    if (!show) {
      setEmail('');
      setMessage('');
    }
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Forgot Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && (
          <Alert variant={message.includes('sent') ? 'success' : 'danger'}>
            {message}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
            className="mt-3"
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPasswordModal;

