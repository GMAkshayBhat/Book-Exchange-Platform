# Book-Exchange-Platform

The **Book-Exchange-Platform** is a user-friendly web application that enables book enthusiasts to exchange, borrow, or lend books. This platform encourages collaboration, promotes affordable access to diverse literature, and fosters sustainable practices by reducing the demand for new books. 

---

## Features
- Exchange books with fellow users.
- Borrow or lend books seamlessly.
- Build communities of book lovers.
- Explore new authors, genres, and ideas.

---

## Installation Guide

### Prerequisites
1. Install [Node.js](https://nodejs.org/)
   - Download and install the latest **LTS version** of Node.js.
   - Verify installation:
     ```bash
     node -v
     npm -v
     ```

2. Install [MongoDB](https://www.mongodb.com/docs/manual/installation/)
   - Follow the installation guide for your OS to install MongoDB.
   - Start the MongoDB service:
     ```bash
     mongod
     ```

---

### Backend Setup (Express.js with MongoDB)
1. Clone the repository:
   ```bash
   git clone [Book Exchange Platform](https://github.com/GMAkshayBhat/Book-Exchange-Platform.git)
   cd Book-Exchange-Platform
    - Navigate to book-exchange-backend ( cd book-exchange-backend)
    - cd backend
    - npm install
    - Create a .env file in the backend directory and add the following:
        MONGO_URI=your-mongodb-connection-string
        PORT=5000
        JWT_SECRET=your-secret-key
        SMTP_EMAIL=your-smtp-email
        SMTP_PASSWORD=your-smtp-password
    - npm start
The backend will run at http://localhost:5000.

---

### Frontend Setup 
1.  Clone the repository:
   ```bash
   git clone https://github.com/GMAkshayBhat/Book-Exchange-Platform.git
   cd Book-Exchange-Platform
    - Navigate to book-exchange-fronend ( cd book-exchange-frontend)
    - npm install
    - npm start
The frontend will run at http://localhost:3000.