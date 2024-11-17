/**
 * @file RedirectHandler.js
 * @description Description of the file
 * @author G M Akshay Bhat
 * @created 11 19:27
 * @modified 11 19:27
 */


import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectHandler = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn, navigate]);

  return null; // This component doesn't render anything
};

export default RedirectHandler;
