const categoryController = require('../controllers/category.controller');
const router = require('express').Router();

router.get('/', categoryController.getAllCategories);

module.exports = router;