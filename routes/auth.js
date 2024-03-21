const express = require('express');
const { register, login, logout,
    login_page, signup_page, logout_page,
} = require('../controllers/auth');
const isAuthenticated = require('../middlewares/auth');

const router = express.Router();

router.get('/signup', signup_page);
router.get('/login', login_page);
router.get('/logout', isAuthenticated, logout_page);

router.post('/form/register', register);
router.post('/form/login', login);
router.post('/form/logout', logout);

module.exports = router;