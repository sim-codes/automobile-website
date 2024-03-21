const express = require('express');
const { dashboard } = require('../controllers/profile');
const isAuthenticated = require('../middlewares/auth');

const router = express.Router();

router.get('/profile', isAuthenticated, dashboard);

module.exports = router;