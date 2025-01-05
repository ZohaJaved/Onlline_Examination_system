import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"

const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
console.log('Application rendered.');
