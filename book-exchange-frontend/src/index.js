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
// <!-- public/index.html -->D:\MTech\2nd Sem\Full-stack\Assignment\Book_Exchange_Platform\book-exchange-frontend\src\assets\images\bookIcon.jpg
<link rel="icon" href="src/assets/images/bookIcon.jpg" />

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
