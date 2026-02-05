import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import RecoverPassword from './pages/Auth/RecoverPassword';
import UserTypeSelection from './pages/Auth/UserTypeSelection';
import StudentRegister from './pages/Auth/StudentRegister';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import TeacherProfile from './pages/TeacherProfile';
import StudentProfile from './pages/Student/Profile';
import ProfessorProfile from './pages/Professor/Profile';
import BookingPage from './pages/Student/Booking';
import TeacherRegistration from './pages/TeacherRegistration';
import './assets/styles/base/variables.css';
import './assets/styles/base/reset.css';
import './assets/styles/base/typography.css';
import './App.css';

// Componente para redirigir a login si no está autenticado
const ProtectedHome = () => {
  const token = localStorage.getItem('token');
  return token ? <Home /> : <Navigate to="/login" replace />;
};

// Componente para proteger la ruta del perfil de profesor
const ProtectedTeacherProfile = () => {
  const token = localStorage.getItem('token');
  return token ? <TeacherProfile /> : <Navigate to="/login" replace />;
};

// Componente para proteger las rutas de perfil según rol
const ProtectedProfile = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // Redirigir según el rol
  if (user.role === 'professor') {
    return <ProfessorProfile />;
  } else if (user.role === 'student') {
    return <StudentProfile />;
  }
  
  // Si no tiene rol, redirigir al home
  return <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedHome />} />
        <Route path="/home" element={<ProtectedHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<UserTypeSelection />} />
        <Route path="/register/student" element={<StudentRegister />} />
        <Route path="/register/professor" element={<TeacherRegistration />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/teacher-registration" element={<TeacherRegistration />} />
        <Route path="/teacher/:id" element={<ProtectedTeacherProfile />} />
        <Route path="/booking/:professorId" element={<BookingPage />} />
        <Route path="/profile" element={<ProtectedProfile />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/professor/profile" element={<ProfessorProfile />} />
        <Route path="/Admin/Dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;