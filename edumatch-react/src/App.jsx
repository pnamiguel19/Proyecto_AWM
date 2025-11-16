import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TeacherRegistration from './pages/TeacherRegistration';
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
