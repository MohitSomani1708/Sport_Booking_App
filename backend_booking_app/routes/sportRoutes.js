const express = require('express');
const { getAllSports } = require('../controllers/sportController');
const authMiddleware = require('../middlewares/authmiddleware.js');
const router = express.Router();

router.get('/', authMiddleware, getAllSports);

module.exports = router;