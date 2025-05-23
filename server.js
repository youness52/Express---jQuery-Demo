
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'studentdb'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

app.post('/students', (req, res) => {
  const { name, age, email } = req.body;
  const sql = 'INSERT INTO students (name, age, email) VALUES (?, ?, ?)';
  db.query(sql, [name, age, email], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ id: result.insertId, name, age, email });
  });
});

app.get('/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.get('/students/:id', (req, res) => {
  db.query('SELECT * FROM students WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ error: 'Student not found' });
    res.json(results[0]);
  });
});

app.put('/students/:id', (req, res) => {
  const { name, age, email } = req.body;
  const sql = 'UPDATE students SET name = ?, age = ?, email = ? WHERE id = ?';
  db.query(sql, [name, age, email, req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Student not found' });
    res.json({ id: req.params.id, name, age, email });
  });
});

app.delete('/students/:id', (req, res) => {
  db.query('DELETE FROM students WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
