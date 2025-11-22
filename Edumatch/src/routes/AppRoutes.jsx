import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Auth
import Login from '../pages/Auth/Login/Login';
import Register from '../pages/Auth/Register/Register';
import RegisterStudent from '../pages/Auth/Register/RegisterStudent';
import RegisterProfessor from '../pages/Auth/Register/RegisterProfessor';

// Student
import Home from '../pages/Home/Home';

// Professor
import ProfileProfessor from '../pages/Professor/Profile/ProfileProfessor';
import MyClasses from '../pages/Professor/MyClasses/MyClasses';
import MyCourses from '../pages/Professor/MyCourses/MyCourses';
import TeachingHistory from '../pages/Professor/TeachingHistory/TeachingHistory';
import Schedule from '../pages/Professor/Schedule/Schedule';
import Documents from '../pages/Professor/Documents/Documents';
import Ratings from '../pages/Professor/Ratings/Ratings'; // ← NUEVA IMPORTACIÓN

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/student" element={<RegisterStudent />} />
      <Route path="/register/professor" element={<RegisterProfessor />} />

      {/* Student Routes */}
      <Route path="/student/home" element={<Home />} />
      <Route path="/student/dashboard" element={<Home />} />

      {/* Professor Routes */}
      <Route path="/professor/profile" element={<ProfileProfessor />} />
      <Route path="/professor/classes" element={<MyClasses />} />
      <Route path="/professor/courses" element={<MyCourses />} />
      <Route path="/professor/history" element={<TeachingHistory />} />
      <Route path="/professor/schedule" element={<Schedule />} />
      <Route path="/professor/documents" element={<Documents />} />
      <Route path="/professor/ratings" element={<Ratings />} /> {/* ← NUEVA RUTA */}
      <Route path="/professor/dashboard" element={<ProfileProfessor />} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<div>Admin Dashboard</div>} />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;