import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Make sure you have your Tailwind CSS set up here
import App from './App';

// This is the critical part that might be missing
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);