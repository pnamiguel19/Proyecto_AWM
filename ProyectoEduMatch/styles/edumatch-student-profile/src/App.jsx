import React from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import StudentProfile from './pages/StudentProfile';

const App = () => {
    return (
        <div className="app-container">
            <Header />
            <div className="main-content">
                <Sidebar />
                <StudentProfile />
            </div>
        </div>
    );
};

export default App;