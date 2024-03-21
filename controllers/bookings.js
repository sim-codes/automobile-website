const Booking = require('../models/bookings')
const express = require('express');

const app = express();
app.use(express.json());

// This function renders the booking page with the provided title and user information.
const booking = (req, res) => {
    res.render('booking', {title: 'Online Booking',
    user: req.session.user});
};


// Handle bookings post request
const bookingRequest = async (req, res) => {
    try {
        const data = {
            user: req.session.user._id,
            date: req.body.date,
            time: req.body.timeslot,
        }

        // Save data to database
    const booking = await Booking.insertMany(data);
    req.session.message = {
        type: 'success',
        message: 'Booking successful!.'
    };
    res.redirect('/user/profile');

    } catch(error){
        req.session.message = {
            type: 'danger',
            message: error._message
        };
        res.redirect('/book-online');
        console.log(error);
    }
}


// Get all bookings by the user
const bookingList = async (req) => {
    try {
        let bookings = await 
        Booking.find({user: req.session.user._id})
        .exec().then((data) => {
            return data;
        }).catch((err) => {
            console.log(err);
            return null;
        });
        return bookings;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Delete booking
const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            req.session.message = {
                type: 'danger',
                message: 'Booking not found.'
            };
            res.redirect('/user/profile');
        } else {
            req.session.message = {
                type: 'success',
                message: 'Booking deleted successfully.'
            };
            res.redirect('/user/profile');
        }
    }
    catch (error) {
        req.session.message = {
            type: 'danger',
            message: error.message
        };
        res.redirect('/user/profile');
    }
}

module.exports = {booking, bookingRequest, bookingList, deleteBooking};
