const pool = require('../config/db');

const createNewTask = async (userId, name, startDate, endDate, description, statusId, categoryId) => {
    const [result] = await pool.query(
        `
        INSERT INTO tasks (name, start_date, end_date, description, user_id, category_id, status_id) VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [name, startDate, endDate, description, userId, categoryId, statusId]
    )
    return result;
}

const getTaskByUserId = async(userId) => {
    const [rows] = await pool.query(
        `
        SELECT
        t.id,
        t.name,
        t.start_date,
        t.end_date,
        t.description,

        s.name AS status_name,
        s.color,
        c.name AS category_name

        FROM tasks t
        JOIN status s ON t.status_id = s.id
        JOIN categories c ON t.category_id = c.id
        WHERE t.user_id = ?
        `,
        [userId]
    );
    return rows;
}

const getTaskByStatusId = async(userId, statusId) => {
    const [rows] = await pool.query(
        `
        SELECT
        t.id,
        t.name,
        t.start_date,
        t.end_date,
        t.description,

        c.name AS category_name,
        s.name AS status_name,
        s.color

        FROM tasks t
        JOIN status s ON t.status_id = s.id
        JOIN categories c ON t.category_id = c.id
        WHERE user_id = ? AND status_id = ?
        `,
        [userId, statusId]
    );
    return rows;
}

const getTaskByCategoryId = async(userId, categoryId) => {
    const [rows] = await pool.query(
        `
        SELECT
        t.name,
        t.start_date,
        t.end_date,
        t.description,
        c.name AS category_name,
        s.name AS status_name,
        s.color
        FROM tasks t
        JOIN status s ON t.status_id = s.id
        JOIN categories c ON t.category_id = c.id
        WHERE user_id = ? AND category_id = ?
        `,
        [userId, categoryId]
    );
    return rows;
}

const getTaskByStartDate = async(userId, startDate) => {
    const [rows] = await pool.query(
        `
        SELECT
        t.name,
        t.start_date,
        t.end_date,
        t.description,
        c.name AS category_name,
        s.name AS status_name,
        s.color
        FROM tasks t
        JOIN status s ON t.status_id = s.id
        JOIN categories c ON t.category_id = c.id
        WHERE user_id = ? AND start_date = ?
        `,
        [userId, startDate]
    );
    return rows;
}

const getTaskByEndDate = async(userId, endDate) => {
    const [rows] = await pool.query(
        `
        SELECT
        t.name,
        t.start_date,
        t.end_date,
        t.description,
        c.name AS category_name,
        s.name AS status_name,
        s.color
        FROM tasks t
        JOIN status s ON t.status_id = s.id
        JOIN categories c ON t.category_id = c.id
        WHERE user_id = ? AND end_date = ?
        `,
        [userId, endDate]
    );
    return rows;
}

const deleteTask = async(taskId, userId) => {
    const [result] = await pool.query(
        `DELETE FROM tasks WHERE id = ? AND user_id = ?`,
        [taskId, userId]
    );
    return result.affectedRows > 0;
}

module.exports = {
    getTaskByUserId,
    getTaskByStatusId,
    getTaskByCategoryId,
    getTaskByStartDate,
    getTaskByEndDate,
    createNewTask,
    deleteTask
};