/**
 * @file HomePage.js
 * @description Description of the file
 * @author G M Akshay Bhat
 * @created 07 19:28
 * @modified 17 19:28
 */


import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Card, Form, InputGroup, Modal } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { FaSearch } from 'react-icons/fa';
import axiosInstance from '../axiosInstance';
import '../assets/styles/HomePage.css';
import FSAurelia from '../assets/images/FSAurelia.jpg';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 6;
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Check login status based on token presence
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = token ? { headers: { 'Authorization': `Bearer ${token}` } } : {};
        const response = await axiosInstance.get('/books', config);
        setBooks(response.data);
        setFilteredBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = books.filter((book) =>
        [book.title, book.author, book.genre].some(
          (field) => field && field.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books);
    }
  }, [searchTerm, books]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0); // Reset to first page when searching
  };

  const currentBooks = filteredBooks.slice(
    currentPage * booksPerPage,
    (currentPage + 1) * booksPerPage
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center remove-padding-bottom">
        <h1 className="text-start">Book House</h1>
        <Form className="d-flex align-items-center padding-right">
          <InputGroup>
            <Form.Control
              type="search"
              placeholder="Search by title, author, or genre"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <InputGroup.Text className="search-icon">
              <FaSearch />
            </InputGroup.Text>
          </InputGroup>
        </Form>
      </div>

      <Container>
        {filteredBooks.length === 0 && (
          <p className="text-center mt-4">No books found matching "{searchTerm}".</p>
        )}

        <Row className="mt-5">
          {currentBooks.map((book) => (
            <Col key={book._id} sm={12} md={6} lg={3} className="mb-4">
              <BookCard
                book={book}
                isLoggedIn={isLoggedIn}
                setShowModal={setShowModal} // Pass down state and handler
              />
            </Col>
          ))}
        </Row>

        <div className="pagination-container">
          <ReactPaginate
            previousLabel={'← Previous'}
            nextLabel={'Next →'}
            pageCount={Math.ceil(filteredBooks.length / booksPerPage)}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />
        </div>
      </Container>

      {/* Modal for login prompt */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You must be logged in to exchange books. Please log in to proceed.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => window.location.href = '/login'}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const BookCard = ({ book, isLoggedIn, setShowModal }) => {
  const getConditionColor = (condition) => {
    if (!condition) return '';
    switch (condition.toLowerCase()) {
      case 'new':
        return 'text-success';
      case 'good':
        return 'text-dark-green';
      case 'used':
        return 'text-warning';
      default:
        return '';
    }
  };

  const handleExchange = () => {
    if (isLoggedIn) {
      alert(`Exchange request has been sent to the owner of "${book.title}"`);
    } else {
      setShowModal(true); // Show modal if not logged in
    }
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={book.coverImageUrl || FSAurelia}
        alt={`${book.title} cover`}
      />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>
          <strong>Author:</strong> {book.author} <br />
          <strong>Genre:</strong> {book.genre} <br />
          <strong>Condition:</strong>
          <span className={getConditionColor(book.condition)}>
            {book.condition || 'Unknown'}
          </span>{' '}
          <br />
          <strong>Availability:</strong>{' '}
          <span className={book.availability ? 'text-success' : 'text-danger'}>
            {book.availability ? 'Available' : 'Not Available'}
          </span>
        </Card.Text>
        {book.availability && (
          <Button variant="primary" onClick={handleExchange}>
            Exchange
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default HomePage;

