import React from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import ProfileCard from '../../components/profile/ProfileCard';
import VerificationSection from '../../components/profile/VerificationSection';
import ReviewsSection from '../../components/profile/ReviewsSection';
import './StudentProfile.css';

const StudentProfile = () => {
    return (
        <div className="container">
            <Header />
            <Sidebar />
            <main className="main-content">
                <ProfileCard />
                <VerificationSection />
                <ReviewsSection />
            </main>
        </div>
    );
};

export default StudentProfile;