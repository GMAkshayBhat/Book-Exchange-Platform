// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import axiosInstance from '../axiosInstance';

// const ResetPassword = () => {
//   const { token } = useParams(); // Get the reset token from the URL
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (newPassword !== confirmPassword) {
//       setMessage('Passwords do not match.');
//       return;
//     }

//     try {
//         const response = await axiosInstance.post(`/auth/reset-password/${token}`, { newPassword });
//       setMessage(response.data.message);
//       setTimeout(() => {
//         navigate('/login'); // Redirect to login page after successful reset
//       }, 2000); // Optional delay for UX
//     } catch (error) {
//       setMessage(error.response?.data?.error || 'Error resetting password.');
//     }
//   };

//   return (
//     <div>
//       <h2>Reset Your Password</h2>
//       {message && <p>{message}</p>}
//       <form onSubmit={handleSubmit}>
//         <label>New Password</label>
//         <input
//           type="password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           required
//         />
//         <label>Confirm New Password</label>
//         <input
//           type="password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Reset Password</button>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import '../assets/styles/ResetPassword.css'; // Import the CSS file for styling
import logo from '../assets/images/literature.png';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axiosInstance.post(`/auth/reset-password/${token}`, { newPassword });
      setMessage(response.data.message);
      setTimeout(() => {
        navigate('/login'); 
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error resetting password.');
    }
  };

  return (
    <div className="reset-password-container">
    <img src={logo} alt="Logo" className="reset-logo" /> {/* Logo added here */}
      <h2>Reset Your Password</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <label>Confirm New Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button variant="primary" type="submit" className='btn btn-primary'>Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
