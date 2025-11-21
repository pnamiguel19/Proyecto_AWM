import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import RecoverPassword from './pages/Auth/RecoverPassword';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import './assets/styles/base/variables.css';
import './assets/styles/base/reset.css';
import './assets/styles/base/typography.css';
import './pages/TeacherRegistration';
import './App.css';
import TeacherRegistration from './pages/TeacherRegistration';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/TeacherRegistration" replace />} />
        <Route path="/TeacherRegistration" element={<TeacherRegistration />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;