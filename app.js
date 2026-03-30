const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
const taskRoutes = require('./routes/task.route');
const categoryRoutes = require('./routes/category.route');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Task Management API' });
});

app.use('/', userRoutes);

app.use('/auth', authRoutes);

app.use('/tasks', taskRoutes);

app.use('/categories', categoryRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

module.exports = app;