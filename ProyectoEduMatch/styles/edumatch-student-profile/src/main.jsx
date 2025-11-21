import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './assets/styles/base/reset.css';
import './assets/styles/base/typography.css';
import './assets/styles/base/variables.css';
import './assets/styles/layout/container.css';
import './assets/styles/components/header.css';
import './assets/styles/components/sidebar.css';
import './assets/styles/components/profile-card.css';
import './assets/styles/components/badges.css';
import './assets/styles/components/buttons.css';
import './assets/styles/components/cards.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);