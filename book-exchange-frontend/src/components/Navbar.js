// import React, { useContext } from 'react';
// import { Navbar, Nav, Container } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaUserCircle } from 'react-icons/fa';
// import { AuthContext } from '../utils/AuthContext'; // Import AuthContext
// import '../assets/styles/Navbar.css';

// import logo from '../assets/images/literature.png';

// const NavigationBar = () => {
//   const { isLoggedIn, logout } = useContext(AuthContext); // Access isLoggedIn and logout from AuthContext
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout(); // Use logout function from AuthContext
//     navigate('/login'); // Redirect to login page
//   };

//   return (
//     <Navbar bg="dark" variant="dark" expand="lg">
//       <Container>
//         <Navbar.Brand as={Link} to="/home">
//           <img
//             src={logo}
//             alt="Logo"
//             width="30"
//             height="30"
//             className="navbar-logo"
//           />{' '}
//           BookExchange
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link as={Link} to="/home">Home</Nav.Link>
//           </Nav>
//           <Nav>
//             {isLoggedIn ? (
//               <>
//                 <Nav.Link as={Link} to="/profile">
//                   <FaUserCircle size={24} /> {/* Display user icon */}
//                 </Nav.Link>
//                 <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
//               </>
//             ) : (
//               <>
//                 <Nav.Link as={Link} to="/login">Login</Nav.Link>
//                 <Nav.Link as={Link} to="/register">Register</Nav.Link>
//               </>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default NavigationBar;
import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../utils/AuthContext';
import '../assets/styles/Navbar.css';
import logo from '../assets/images/literature.png';

const NavigationBar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the current path includes "reset-password"
  const isResetPasswordPage = location.pathname.includes('/reset-password');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          <img
            src={logo}
            alt="Logo"
            width="30"
            height="30"
            className="navbar-logo"
          />{' '}
          BookExchange
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Hide Home link if on reset password page */}
            {!isResetPasswordPage && <Nav.Link as={Link} to="/home">Home</Nav.Link>}
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/profile">
                  <FaUserCircle size={24} />
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              // Hide Login and Register links if on reset password page
              !isResetPasswordPage && (
                <>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
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
