const { pool } = require('./conexion');

const getBooks = async () => {
  const { rows: boks } = await pool.query('SELECT * FROM books');
  return boks;
};

// const deleteEvento = async (id) => {
//   const consulta = "DELETE FROM eventos WHERE id = $1";
//   const values = [id];
//   const { rowCount } = await pool.query(consulta, values);
//   if (!rowCount) throw { code: 404, message: "No se encontró ningún evento con este ID" };
// };

module.exports = { getBooks };
