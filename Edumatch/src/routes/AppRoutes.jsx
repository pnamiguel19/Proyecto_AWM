import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login/Login';
import Register from '../pages/Auth/Register/Register';
import RegisterStudent from '../pages/Auth/Register/RegisterStudent';
import RegisterProfessor from '../pages/Auth/Register/RegisterProfessor';
import ProfileStudent from '../pages/Student/Profile/ProfileStudent';
import MyClasses from '../pages/Student/MyClasses/MyClasses';
import MyTeachers from '../pages/Student/MyTeachers/MyTeachers';
import Reviews from '../pages/Student/Reviews/Reviews';
import ProfileProfessor from '../pages/Professor/Profile/ProfileProfessor';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/student" element={<RegisterStudent />} />
      <Route path="/register/professor" element={<RegisterProfessor />} />

      {/* Student Routes */}
      <Route path="/student/profile" element={<ProfileStudent />} />
      <Route path="/student/myclasses" element={<MyClasses />} />
      <Route path="/student/myteachers" element={<MyTeachers />} />
      <Route path="/student/reviews" element={<Reviews />} />

      {/* Professor Routes */}
      <Route path="/professor/profile" element={<ProfileProfessor />} />

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;