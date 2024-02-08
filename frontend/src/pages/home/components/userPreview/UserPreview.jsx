// UserPreview.jsx
import React from 'react';

const UserPreview = ({ user }) => {
    return (
        <div className="userPreview">
            <div className="userImageModal">
                <img src={user ? `data:image/png;base64,${user.profileImage}` : user} />
            </div>
            <div>
                <span>User ID:</span> {user ? user.idUsers : 'N/A'}
            </div>
            <div>
                <span>Username:</span> {user ? user.username : 'N/A'}
            </div>
            <div>
                <span>Name:</span> {user ? `${user.firstName} ${user.lastName}` : 'N/A'}
            </div>
            <div>
                <span>Email:</span> {user ? user.email : 'N/A'}
            </div>
        </div>
    );
};

export default UserPreview;
