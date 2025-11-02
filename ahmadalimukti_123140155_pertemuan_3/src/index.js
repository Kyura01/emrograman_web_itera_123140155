import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// Import secara eksplisit ke App.jsx agar tidak tertukar dengan App.js yang lain
// Ini memastikan komponen di `src/components` (Navigation, FilterBar, dll.) digunakan
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);