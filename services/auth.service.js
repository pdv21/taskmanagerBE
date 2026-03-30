const pool = require('../config/db');

const createUser = async (full_name, email, password, phone, latitude, longitude, department, title) => {
    console.log(full_name, email, password, phone, latitude, longitude, department, title);
    const [result] = await pool.query(
        `
        INSERT INTO users (full_name, email, password_hash, phone, latitude, longitude, department, title) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [full_name, email, password, phone, latitude, longitude, department, title]
    )
console.log('User created with ID:', result.insertId);
    return result.insertId;
}

const getUserByEmail = async(email) => {
    const [rows] = await pool.query(
        `
        SELECT * FROM users WHERE email = ?
        `,
        [email]
    );
    return rows[0];
}

const saveResetToken = async(email, token, expire) => {
    await pool.query(
        `
        UPDATE users SET reset_token = ?, reset_token_expire = ? WHERE email = ?
        `,
        [token, expire, email]
    );
}

const getUserByResetToken = async(token) => {
    const [rows] = await pool.query(
        `
        SELECT * FROM users WHERE reset_token = ?
        `,
        [token]
    );
    return rows[0];
}

const updatePassword = async(userId, newPassword) => {
    await pool.query(
        `
        UPDATE users SET password_hash = ?, reset_token = NULL, reset_token_expire = NULL WHERE id = ?
        `,
        [newPassword, userId]
    );
}

module.exports = {
    createUser,
    getUserByEmail,
    saveResetToken,
    getUserByResetToken,
    updatePassword
};
