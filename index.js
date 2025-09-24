const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const { getBooks } = require('./consultas');

app.listen(3000, console.log('SERVER ON'));
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.send('hola!');
});

app.get('/books', async (req, res) => {
  try {
    const books = await getBooks();
    res.json(books);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
});
