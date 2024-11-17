/**
 * @file index.js
 * @description Description of the file
 * @author G M Akshay Bhat
 * @created 31 19:34
 * @modified 12 19:34
 */


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './utils/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

<link rel="icon" href="src/assets/images/bookIcon.jpg" />

reportWebVitals();
