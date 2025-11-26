import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import { loadFromLocalStorage, saveToLocalStorage } from './data/mockUsers';
import './App.css';

function App() {
  useEffect(() => {
    // Inicializar datos de usuarios mock en localStorage si no existen
    const existingData = localStorage.getItem('edumatch_users');
    if (!existingData) {
      console.log('📦 Inicializando datos mock en localStorage...');
      saveToLocalStorage();
    } else {
      console.log('✅ Datos mock ya existen en localStorage');
      loadFromLocalStorage();
    }
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
