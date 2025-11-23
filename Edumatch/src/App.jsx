import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Auth
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import RegisterStudent from './pages/Auth/Register/RegisterStudent';
import RegisterProfessor from './pages/Auth/Register/RegisterProfessor'; // IMPORTAR

// Home
import Home from './pages/Home/Home';

// Student
import ProfileStudent from './pages/Student/Profile/ProfileStudent';
import MyClasses from './pages/Student/MyClasses/MyClasses';
import MyTeachers from './pages/Student/MyTeachers/MyTeachers';
import Reviews from './pages/Student/Reviews/Reviews';

// Professor (si las tienes)
import ProfileProfessor from './pages/Professor/Profile/ProfileProfessor';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/student" element={<RegisterStudent />} />
        
        {/* RUTA CLAVE: Registro de Profesor */}
        <Route path="/register/professor" element={<RegisterProfessor />} />

        {/* Home (Protegido) */}
        <Route path="/" element={<Home />} />

        {/* Rutas de Estudiante */}
        <Route path="/student/profile" element={<ProfileStudent />} />
        <Route path="/student/my-classes" element={<MyClasses />} />
        <Route path="/student/my-teachers" element={<MyTeachers />} />
        <Route path="/student/reviews" element={<Reviews />} />

        {/* Rutas de Profesor */}
        <Route path="/professor/profile" element={<ProfileProfessor />} />

      </Routes>
    </Router>
  );
}

export default App;
