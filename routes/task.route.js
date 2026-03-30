const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.get('/', verifyToken, taskController.getTaskUser);
router.post('/create', verifyToken, taskController.createTask);
router.get('/status/:statusId', verifyToken, taskController.getTaskByStatus);
router.get('/category/:categoryId', verifyToken, taskController.getTaskByCategory);
router.get('/startdate/:startDate', verifyToken, taskController.getTaskByStartD);
router.get('/enddate/:endDate', verifyToken, taskController.getTaskByEndD);
router.delete('/delete/:taskId', verifyToken, taskController.deleteTask);

module.exports = router;