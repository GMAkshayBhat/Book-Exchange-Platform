// src/components/ProfilePage.js
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../utils/AuthContext'; // Import AuthContext
import axios from 'axios';
import { Button, Form, Alert, Container } from 'react-bootstrap';

const ProfilePage = () => {
  const { isLoggedIn } = useContext(AuthContext); // Use AuthContext to check if the user is logged in
  const [userData, setUserData] = useState({ username: '', email: '' });
  const [newUsername, setNewUsername] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [message, setMessage] = useState('');

  // Fetch user data from the server when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from local storage
        const response = await axios.get('http://localhost:5000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
        setNewUsername(response.data.username); // Set initial username
      } catch (error) {
        setMessage('Failed to load profile data');
      }
    };

    if (isLoggedIn) fetchUserData();
  }, [isLoggedIn]);

  // Handle profile picture file change
  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  // Handle username change
  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  // Handle form submission for updating profile
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('username', newUsername);
    if (profilePic) {
      formData.append('profilePic', profilePic); // Append profile picture if it's been selected
    }

    try {
      const response = await axios.put('http://localhost:5000/api/user/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setUserData(response.data);
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Failed to update profile');
    }
  };

  return (
    <Container className="profile-page">
      <h2>User Profile</h2>
      {message && <Alert variant="info">{message}</Alert>}

      <div className="profile-info">
        <p>Email: {userData.email}</p>
        <img
          src={userData.profilePic || 'default-avatar.jpg'}
          alt="Profile"
          width="100"
          height="100"
        />
      </div>

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
          Update Profile
        </Button>
      </Form>
    </Container>
  );
};

export default ProfilePage;
