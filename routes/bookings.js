const express = require('express');
const {booking, bookingRequest, deleteBooking} = require('../controllers/bookings');
const isAuthenticated = require('../middlewares/auth');

const router = express.Router();


router.get('/online', isAuthenticated, booking);
router.post('/request', bookingRequest);
router.post('/delete/:id', deleteBooking);

module.exports = router;