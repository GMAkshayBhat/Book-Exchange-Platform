/**
 * @file Navbar.js
 * @description Description of the file
 * @author G M Akshay Bhat
 * @created 03 19:27
 * @modified 17 19:27
 */


import React, { useContext, useState } from 'react';
import { Navbar, Nav, Container, Dropdown, Badge } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUserCircle, FaSearch, FaBell } from 'react-icons/fa';
import { AuthContext } from '../utils/AuthContext';
import '../assets/styles/Navbar.css';
import logo from '../assets/images/literature.png'; 

const NavigationBar = ({ isAuthenticated, onLoginClick, onRegisterClick, onSearch }) => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState(5); // Example: 5 notifications for now

  const isResetPasswordPage = location.pathname.includes('/reset-password');

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  const handleLoginClick = () => {
    onLoginClick(true);
    navigate('/login');
  };

  const handleRegisterClick = () => {
    onRegisterClick(true);
    navigate('/login');
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); // Pass search term to parent component (HomePage)
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          <img src={logo} alt="Logo" width="30" height="30" className="navbar-logo" />{' '}
          BookExchange
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!isResetPasswordPage && <Nav.Link as={Link} to="/home">Home</Nav.Link>}
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <>
                {/* Notification Bell */}
                <Nav.Link onClick={() => handleNavigate('/notifications')} className="position-relative">
                  <FaBell size={20} />
                  {notifications > 0 && (
                    <Badge
                      bg="danger"
                      pill
                      style={{
                        position: 'absolute',
                        right: 0,
                        transform: 'translate(50%, -50%)',
                      }}
                    >
                      {notifications}
                    </Badge>
                  )}
                </Nav.Link>

                {/* User Dropdown */}
                <Dropdown align="end">
                  <Dropdown.Toggle id="user-dropdown">
                    <FaUserCircle size={30} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleNavigate('/profile')}>User Profile</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleNavigate('/manage-books')}>Manage My Books</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleNavigate('/help')}>Help</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              !isResetPasswordPage && (
                <>
                  <Nav.Link onClick={handleLoginClick}>Login</Nav.Link>
                  <Nav.Link onClick={handleRegisterClick}>Register</Nav.Link>
                </>
              )
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
