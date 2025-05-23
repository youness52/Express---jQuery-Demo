
# Student Management System

A simple web app to manage students using Express.js, MySQL, and jQuery.

## Setup

### Backend
1. Create MySQL database:

```sql
CREATE DATABASE studentdb;
USE studentdb;
CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  age INT,
  email VARCHAR(255)
);
```

2. Install dependencies:

```bash
npm install express mysql2 body-parser cors
node server.js
```

### Frontend

Just open `index.html` in your browser.

> Make sure `server.js` is running at `http://localhost:3000`
