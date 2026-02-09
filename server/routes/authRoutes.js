const express = require('express');
const router = express.Router();
const { authUser, registerUser } = require('../controllers/authController');
const { validate, userSchema } = require('../middleware/validationMiddleware');

router.post('/register', validate(userSchema), registerUser);
router.post('/login', authUser);

module.exports = router;
