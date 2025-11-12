import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import RecoverPassword from './pages/Auth/RecoverPassword';
import './assets/styles/base/variables.css';
import './assets/styles/base/reset.css';
import './assets/styles/base/typography.css';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
