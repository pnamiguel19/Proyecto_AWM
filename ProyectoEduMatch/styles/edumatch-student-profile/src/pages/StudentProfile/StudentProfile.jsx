import React from 'react';
import './StudentProfile.css';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import ProfileCard from '../../components/profile/ProfileCard';
import ProfileImage from '../../components/profile/ProfileImage';
import VerificationSection from '../../components/profile/VerificationSection';
import ReviewsSection from '../../components/profile/ReviewsSection';

const StudentProfile = () => {
    return (
        <div className="container">
            <Header />
            <Sidebar />
            <main className="main-content">
                <ProfileCard />
                <ProfileImage />
                <VerificationSection />
                <ReviewsSection />
            </main>
        </div>
    );
};

export default StudentProfile;