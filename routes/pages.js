const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/auth');

const { index, 
    services, 
    ourWorks, 
    about, 
    contact } = require('../controllers/pages')

router.get('/', index);
router.get('/services', services);
router.get('/our-works', ourWorks);
router.get('/about-us', about);
router.get('/contact-us', contact);

module.exports = router;