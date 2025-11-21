import React from 'react';
import './ProfileCard.css';
import ProfileImage from '../ProfileImage';
import VerificationSection from '../VerificationSection';
import ReviewsSection from '../ReviewsSection';

const ProfileCard = ({ user }) => {
    return (
        <div className="profile-card">
            <div className="profile-header">
                <h2>Información sobre mí</h2>
                <button className="edit-btn">Editar</button>
            </div>

            <div className="profile-info">
                <ProfileImage src={user.profileImage} alt={user.name} />
                <h1 className="profile-name">{user.name}</h1>
                <p className="profile-role">{user.role}</p>
            </div>

            <VerificationSection isVerified={user.isVerified} />
            <ReviewsSection reviews={user.reviews} />
        </div>
    );
};

export default ProfileCard;