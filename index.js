const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const {
  getBooks,
  verificarCredenciales,
  deleteEvento,
} = require('./consultas');
const jwt = require('jsonwebtoken');

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

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    await verificarCredenciales(email, password);

    const token = jwt.sign({ email }, 'az_AZ');
    res.send(token);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
});

app.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;

    console.log('id', id);

    const autorizacion = req.header('Authorization');

    console.log('autorizacion', autorizacion);

    const token = autorizacion.split('Bearer')[1].trim();

    console.log(token);

    jwt.verify(token, 'az_AZ');

    const { email } = jwt.decode(token);

    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJvb2tzLmNvbSIsImlhdCI6MTc1ODc1ODUzMH0.5Q2bxM2LGi6hqAz-RR2XX5AjtnSj-7U-gOWdFo7EjXE

    await deleteEvento(id);

    res.send(`El usuario ${email} he eliminado el libro con el id: ${id}`);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
});
