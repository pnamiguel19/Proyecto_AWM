import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Lazy loading de componentes
const Home = lazy(() => import('../pages/Home/Home'));
const Login = lazy(() => import('../pages/Auth/Login/Login'));
const Register = lazy(() => import('../pages/Auth/Register/Register'));
const RegisterStudent = lazy(() => import('../pages/Auth/Register/RegisterStudent'));
const RegisterProfessor = lazy(() => import('../pages/Auth/Register/RegisterProfessor'));

// Student routes
const ProfileStudent = lazy(() => import('../pages/Student/Profile/ProfileStudent'));
const MyClasses = lazy(() => import('../pages/Student/MyClasses/MyClasses'));
const MyTeachers = lazy(() => import('../pages/Student/MyTeachers/MyTeachers'));
const Reviews = lazy(() => import('../pages/Student/Reviews/Reviews'));
const TeacherProfile = lazy(() => import('../pages/Student/TeacherProfile/TeacherProfile'));
const ScheduleClass = lazy(() => import('../pages/Student/ScheduleClass/ScheduleClass'));
const Checkout = lazy(() => import('../pages/Student/Checkout/Checkout'));

// Professor routes
const ProfileProfessor = lazy(() => import('../pages/Professor/Profile/ProfileProfessor'));

// Loading component
const Loading = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    fontSize: '1.5rem',
    color: '#00D9E1'
  }}>
    Cargando...
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/student" element={<RegisterStudent />} />
        <Route path="/register/professor" element={<RegisterProfessor />} />

        {/* Student Routes */}
        <Route path="/student/profile" element={<ProfileStudent />} />
        <Route path="/student/my-classes" element={<MyClasses />} />
        <Route path="/student/my-teachers" element={<MyTeachers />} />
        <Route path="/student/reviews" element={<Reviews />} />
        <Route path="/teacher/:id" element={<TeacherProfile />} />
        <Route path="/schedule/:teacherId" element={<ScheduleClass />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Professor Routes */}
        <Route path="/professor/profile" element={<ProfileProfessor />} />

        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;