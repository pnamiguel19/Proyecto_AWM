import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Auth/Login/Login';
import Register from '../pages/Auth/Register/Register';
import RegisterStudent from '../pages/Auth/Register/RegisterStudent';
import RegisterProfessor from '../pages/Auth/Register/RegisterProfessor';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/student" element={<RegisterStudent />} />
      <Route path="/register/professor" element={<RegisterProfessor />} />
    </Routes>
  );
};

export default AppRoutes;