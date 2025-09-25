const { pool } = require('./conexion');

const getBooks = async () => {
  const { rows: boks } = await pool.query('SELECT * FROM books');
  return boks;
};

const verificarCredenciales = async (email, password) => {
  const consulta = 'SELECT * FROM users WHERE email = $1 AND password = $2';

  console.log(consulta);

  const valores = [email, password];

  const { rowCount } = await pool.query(consulta, valores);
  if (!rowCount)
    throw {
      code: 404,
      message: 'No se encontro el usuario con estas credenciales',
    };
};

const deleteEvento = async (id) => {
  console.log('entro');
  const consulta = 'DELETE FROM books WHERE id = $1';
  const values = [id];
  const { rowCount } = await pool.query(consulta, values);
  console.log('rowCount', rowCount);
  if (!rowCount)
    throw { code: 404, message: 'No se encontró ningún libro con este ID' };
};

module.exports = { getBooks, verificarCredenciales, deleteEvento };
