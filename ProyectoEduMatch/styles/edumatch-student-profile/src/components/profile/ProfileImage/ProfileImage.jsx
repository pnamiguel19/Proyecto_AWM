import React from 'react';
import './ProfileImage.css';

const ProfileImage = ({ imageUrl, name, isVerified }) => {
    return (
        <div className="profile-image-container">
            <img src={imageUrl} alt={name} className="profile-image" />
            {isVerified && <div className="verified-badge">✓</div>}
        </div>
    );
};

export default ProfileImage;