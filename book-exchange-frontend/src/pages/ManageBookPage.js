/**
 * @file ManageBookPage.js
 * @description Description of the file
 * @author G M Akshay Bhat
 * @created 10 19:29
 * @modified 10 19:29
 */


import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Modal, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../axiosInstance';
import '../assets/styles/ManageBooks.css';
import ReactPaginate from 'react-paginate';

const ManageBooks = () => {
  const [bookDetails, setBookDetails] = useState({
    title: '',
    author: '',
    genre: '',
    condition: '',
    availability: true,
    pdfFileUrl: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [books, setBooks] = useState([]);
  const [editMode, setEditMode] = useState(null);

  // State for delete confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

   // Pagination states
   const [currentPage, setCurrentPage] = useState(0);
   const booksPerPage = 8; // Number of books per page
 
 useEffect(() => {
  fetchMyBooks();
}, []);
// Fetch books related to the authenticated user
  const fetchMyBooks = async () => {
    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        alert('User not authenticated');
        return;
      }

      const response = await axiosInstance.get('/books?mine=true', {
        headers: {
          Authorization: `Bearer ${token}`,
        },  
      });
       if (response.data.message && response.data.message === 'Your book list is currently empty') {
        // If no books are found, handle this scenario
        setBooks([]);  // Clear any previously set books (if any)
        setNoBooksFound(true); // Show the "No books found" message and allow adding books
      } else {
        setBooks(response.data); // Set only the user's books
        setNoBooksFound(false); // Hide "No books found" message if books exist
      }
    } catch (error) {
      console.error('Error fetching user books:', error);
      alert('Failed to fetch your books .');
    }
  };

// To keep track of "No books found" state
const [noBooksFound, setNoBooksFound] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/books', bookDetails);
      if (response.status === 201) {
        alert('Book added successfully!');
        setBooks((prevBooks) => [...prevBooks, response.data]);

        setBookDetails({
          title: '',
          author: '',
          genre: '',
          condition: '',
          availability: true,
          pdfFileUrl: ''
        });

        setShowModal(false);
      }
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book.');
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDelete = async () => {
    if (bookToDelete) {
      try {
        const response = await axiosInstance.delete(`/books/${bookToDelete}`);
        if (response.status === 200) {
          setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookToDelete));
          alert('Book deleted successfully!');
          setShowDeleteModal(false);  // Close the modal after deletion
          fetchMyBooks();
        }
      } catch (error) {
        console.error('Error deleting book:', error);
        alert('Failed to delete book.');
      }
    }
  };

  const handleFavorite = async (bookId) => {
    try {
      const response = await axiosInstance.patch(`/books/${bookId}/favorite`);
      if (response.status === 200) {
        const updatedBooks = books.map((book) =>
          book._id === bookId ? { ...book, favorite: response.data.favorite } : book
        );
        setBooks(updatedBooks);
        alert('Favorite status updated successfully!');
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
      alert('Failed to update favorite status.');
    }
  };

  const handleEdit = (book) => {
    setBookDetails(book);
    setEditMode(book._id);
  };

  const handleSave = async () => {
    try {
      const response = await axiosInstance.put(`/books/${editMode}`, bookDetails);
      if (response.status === 200) {
        alert('Book updated successfully!');
        setBooks((prevBooks) =>
          prevBooks.map((book) => (book._id === editMode ? response.data : book))
        );
        setEditMode(null);
      }
    } catch (error) {
      console.error('Error updating book:', error);
      alert('Failed to update book.');
    }
  };
  const handleAddBookClick = () => {
    setShowModal(true); // Show the modal to add a new book
  };

  const getConditionColor = (condition) => {
    if (condition === 'New' || condition === 'new' || condition === 'Good' || condition === 'good') {
      return 'green';
    } else if (condition === 'Used' || condition === 'used') {
      return 'orange';
    }
    return 'gray';
  };

  // Handle show delete confirmation modal
  const handleShowDeleteModal = (bookId) => {
    setBookToDelete(bookId);
    setShowDeleteModal(true);
  };

  // Handle cancel delete action
  const handleCloseDeleteModal = () => {
    setBookToDelete(null);
    setShowDeleteModal(false);
  };
// Get the books to display based on current page
const currentBooks = books.slice(currentPage * booksPerPage, (currentPage + 1) * booksPerPage);

// Handle page click event
const handlePageClick = ({ selected }) => {
  setCurrentPage(selected);
};
  return (
    <Container>
      <h2 className="mt-4 text-center">Manage Books</h2>
 {/* Display the "No books found" message and the Add Book button only if no books are available */}
{noBooksFound && books.length === 0 && (
  <div className="d-flex justify-content-center align-items-center" style={{ height: '75vh' }}>
    <div className="text-center">
      <p>No books found. Would you like to add a new book?</p>
      <Button variant="primary" onClick={handleAddBookClick}>
        Add Book
      </Button>
    </div>
  </div>
)}
     <Modal show={showModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>Add New Book</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title <span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter book title"
          name="title"
          value={bookDetails.title}
          onChange={handleChange}
          required  // Making it a mandatory field
        />
      </Form.Group>

      <Form.Group controlId="author">
        <Form.Label>Author <span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter author name"
          name="author"
          value={bookDetails.author}
          onChange={handleChange}
          required  // Making it a mandatory field
        />
      </Form.Group>

      <Form.Group controlId="genre">
        <Form.Label>Genre <span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter genre"
          name="genre"
          value={bookDetails.genre}
          onChange={handleChange}
          required  // Making it a mandatory field
        />
      </Form.Group>

      <Form.Group controlId="condition">
        <Form.Label>Condition <span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter book condition"
          name="condition"
          value={bookDetails.condition}
          onChange={handleChange}
          required  // Making it a mandatory field
        />
      </Form.Group>

      <Form.Group controlId="availability">
        <Form.Label>Availability <span style={{ color: 'red' }}>*</span></Form.Label>
        <Form.Check
          type="checkbox"
          label="Available"
          name="availability"
          checked={bookDetails.availability}
          onChange={(e) => setBookDetails((prevDetails) => ({
            ...prevDetails,
            availability: e.target.checked
          }))}
          required  // Making it a mandatory field
        />
      </Form.Group>

      <Form.Group controlId="pdfFileUrl">
        <Form.Label>PDF File URL </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter URL for the PDF file"
          name="pdfFileUrl"
          value={bookDetails.pdfFileUrl}
          onChange={handleChange}
            // Making it a mandatory field
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        Add Book
      </Button>
    </Form>
  </Modal.Body>
</Modal>

      {books.length > 0 && (
        <div className="mt-4 " style={{ height: '73%' }}>
             <div className="d-flex justify-content-between align-items-center " >
          <h3>My Books List</h3>
          <Button variant="primary" className='button-bottom-margin' onClick={handleShowModal}>
        Add Book
      </Button>
      </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Condition</th>
                <th>Availability</th>
                <th>PDF URL</th>
                <th>Favorite</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.map((book) => (
                <tr key={book._id}>
                  <td>
                    {editMode === book._id ? (
                      <Form.Control
                        type="text"
                        value={bookDetails.title}
                        name="title"
                        onChange={handleChange}
                      />
                    ) : (
                      book.title
                    )}
                  </td>
                  <td>
                    {editMode === book._id ? (
                      <Form.Control
                        type="text"
                        value={bookDetails.author}
                        name="author"
                        onChange={handleChange}
                      />
                    ) : (
                      book.author
                    )}
                  </td>
                  <td>
                    {editMode === book._id ? (
                      <Form.Control
                        type="text"
                        value={bookDetails.genre}
                        name="genre"
                        onChange={handleChange}
                      />
                    ) : (
                      book.genre
                    )}
                  </td>
                  <td>
                    {editMode === book._id ? (
                      <Form.Control
                        type="text"
                        value={bookDetails.condition}
                        name="condition"
                        onChange={handleChange}
                      />
                    ) : (
                      <span style={{ color: getConditionColor(book.condition) }}>
                        {book.condition}
                      </span>
                    )}
                  </td>
                  <td>
                    {editMode === book._id ? (
                      <Form.Check
                        type="checkbox"
                        checked={bookDetails.availability}
                        name="availability"
                        onChange={(e) => setBookDetails({ ...bookDetails, availability: e.target.checked })}
                      />
                    ) : (
                      <span style={{ color: book.availability ? 'green' : 'red' }}>
                        {book.availability ? 'Available' : 'Unavailable'}
                      </span>
                    )}
                  </td>
                  <td>
                    {editMode === book._id ? (
                      <Form.Control
                        type="text"
                        value={bookDetails.pdfFileUrl}
                        name="pdfFileUrl"
                        onChange={handleChange}
                      />
                    ) : (
                      <a href={book.pdfFileUrl} target="_blank" rel="noopener noreferrer">
                        View PDF
                      </a>
                    )}
                  </td>
                  <td>
                    <Button
                      variant={book.favorite ? 'warning' : 'secondary'}
                      onClick={() => handleFavorite(book._id)}
                    >
                      <FontAwesomeIcon icon={faStar} />
                    </Button>
                  </td>
                  <td>
                    {editMode === book._id ? (
                      <Button variant="success" onClick={handleSave}>Save</Button>
                    ) : (
                      <>
                        {/* Icon-based Edit and Delete */}
                        <FontAwesomeIcon
                          icon={faPen}
                          onClick={() => handleEdit(book)}
                          style={{ cursor: 'pointer', marginRight: '10px' }}
                        />
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          onClick={() => handleShowDeleteModal(book._id)}
                          style={{ cursor: 'pointer' }}
                        />
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
           {/* Pagination */}
           <ReactPaginate
            previousLabel={'Prev'}
            nextLabel={'Next'}
            pageCount={Math.ceil(books.length / booksPerPage)}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
          />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this book?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageBooks;



