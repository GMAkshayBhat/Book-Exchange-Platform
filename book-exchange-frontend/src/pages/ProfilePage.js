/**
 * @file ProfilePage.js
 * @description Description of the file
 * @author G M Akshay Bhat
 * @created 06 19:31
 * @modified 17 19:31
 */


import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../utils/AuthContext'; // Assuming this context manages auth state
import { Button, Form, Alert, Container } from 'react-bootstrap';
import axiosInstance from '../axiosInstance';
import '../assets/styles/Profile.css'; 

const ProfilePage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [userData, setUserData] = useState({ username: '', email: '', profilePic: '' });
  const [newUsername, setNewUsername] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get('/protected/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.user) {
          setUserData(response.data.user);
          setNewUsername(response.data.user.username);
        } else {
          setMessage('Failed to load profile data');
        }
      } catch (error) {
        setMessage('Failed to load profile data');
      }
    };

    if (isLoggedIn) fetchUserData();
  }, [isLoggedIn]);

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('username', newUsername);
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }

    try {
      const response = await axiosInstance.put('/protected/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      const updatedUserData = await axiosInstance.get('/protected/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserData(updatedUserData.data.user);
      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      setMessage('Failed to update profile');
    }
  };

  return (
    <Container className="profile-page">
      <h2>User Profile</h2>
      {message && <Alert variant="info">{message}</Alert>}

      {!isEditing ? (
       
        <div className="profile-info">
  {/* Profile Image at the top */}
  <img
    src={userData.profilePic ? `http://localhost:5000/uploads/profile-pics/${userData.profilePic}` : '/profile_pic.jpg'}
    alt="Profile"
  />

  {/* Username and Email below the profile image */}
  <p>Username: {userData.username}</p>
  <p>Email: {userData.email}</p>

  <Button variant="secondary" onClick={() => setIsEditing(true)}>
    Edit Profile
  </Button>
</div>
      ) : (
        <Form onSubmit={handleProfileUpdate}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={newUsername}
              onChange={handleUsernameChange}
            />
          </Form.Group>

          <Form.Group controlId="profilePic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control type="file" onChange={handleProfilePicChange} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save Changes
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)} className="ms-2">
            Cancel
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default ProfilePage;
