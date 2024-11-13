import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import BookList from '../components/BookList';

import axiosInstance from '../axiosInstance';

// const HomePage = () => {
//   return (
//     <Container>
//       <Row className="mt-5">
//         <Col>
//           <h1>Welcome to Book Exchange</h1>
//           <BookList />
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default HomePage;
const HomePage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get('/books');  // Fetch books from protected route
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Container>
      <Row className="mt-5">
         <Col>
        
          <BookList />
        </Col>
      </Row>
    </Container>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;