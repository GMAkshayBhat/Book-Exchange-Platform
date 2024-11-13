import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const BookList = () => {
  const books = [
    { id: 1, title: "Book 1", author: "Author 1", genre: "Fiction" },
    { id: 2, title: "Book 2", author: "Author 2", genre: "Non-Fiction" },
    // Sample data
  ];

  return (
    <Row>
      {books.map(book => (
        <Col key={book.id} md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Text>
                <strong>Author:</strong> {book.author}<br />
                <strong>Genre:</strong> {book.genre}
              </Card.Text>
              <Button variant="primary">View Details</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default BookList;
