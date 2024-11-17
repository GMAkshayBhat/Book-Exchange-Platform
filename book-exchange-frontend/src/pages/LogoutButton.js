/**
 * @file LogoutButton.js
 * @description Description of the file
 * @author G M Akshay Bhat
 * @created 17 19:29
 * @modified 17 19:29
 */


const handleLogout = () => {
    localStorage.removeItem('token');
    // Redirect to login or home page
  };
  