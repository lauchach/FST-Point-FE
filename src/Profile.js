import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from './apiService'; 

const Profile = () => {
    const [profile, setProfile] = useState({ name: '', email: '' });
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userProfile = await getUserProfile();
                setProfile(userProfile);
            } catch (err) {
                setError('Failed to load profile: ' + err.message);
            }
        };
        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSave = async () => {
        try {
            await updateUserProfile(profile);
            setSuccess('Profile updated successfully!');
            setEditMode(false);
        } catch (err) {
            setError('Failed to update profile: ' + err.message);
        }
    };

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            {!editMode ? (
                <div className="profile-info">
                    <p><span>Name:</span> {profile.name}</p>
                    <p><span>Email:</span> {profile.email}</p>
                    <button className="profile-edit-btn" onClick={() => setEditMode(true)}>
                        Edit Profile
                    </button>
                </div>
            ) : (
                <div className="profile-edit-form">
                    <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                    />
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                    />
                    <button onClick={handleSave}>Save</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
