const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { addDummyUsers } = require('../controllers/addDummyUsers.js')
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
// router.post('/dummy',addDummyUsers)

module.exports = router;
