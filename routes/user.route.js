const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.get('/me', verifyToken, userController.getUserProfile);
router.delete('/delete', verifyToken, userController.deleteUser);
router.patch('/update', verifyToken, userController.updateUser);

module.exports = router;