import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Importar estilos base
import './assets/styles/base/variables.css';
import './assets/styles/base/reset.css';
import './assets/styles/base/typography.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
