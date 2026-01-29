
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Assuming Tailwind is configured via a CSS file or directly via script

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
// Fix: Corrected the incomplete StrictMode closing tag and added missing parenthesis/semicolon
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
