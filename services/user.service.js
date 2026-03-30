const pool = require('../config/db');

const getUserById = async (userId) => {
  const [rows] = await pool.execute('SELECT id, full_name, email, phone, create_at, latitude, longitude, department, title FROM users WHERE id = ?', [userId]);
  return rows[0];
}

const deleteUserById = async(userId) => {
  const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [userId]);
  return result;
}

const updateUserById = async(userId, data) => {
  const fields = [];
  const values = [];

  const allowFields = ['full_name', 'email', 'password'];

  for (const key in data) {
    if(data[key] !== undefined && allowFields.includes(key)) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }
  }

  if(fields.length === 0) {return false;}

  const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
  values.push(userId);
  const [result] = await pool.execute(sql, values);
  return result;
}

module.exports = {
  getUserById,
  deleteUserById,
  updateUserById
};