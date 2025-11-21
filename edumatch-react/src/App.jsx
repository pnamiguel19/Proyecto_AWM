import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TeacherRegistration from './pages/TeacherRegistration';
import './assets/styles/base/variables.css';
import './assets/styles/base/reset.css';
import './assets/styles/base/typography.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TeacherRegistration />} />
        <Route path="/registro-profesor" element={<TeacherRegistration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
