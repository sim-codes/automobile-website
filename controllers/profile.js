const express = require('express');
const { bookingList } = require('./bookings');

const app = express();
app.use(express.json());

// Handle dashboard request
const dashboard = async (req, res) => {
    const data = await bookingList(req);
    res.render('profile', {
        title: 'Dashboard',
        bookings: data,
        user: req.session.user
    });
}


module.exports = { dashboard };