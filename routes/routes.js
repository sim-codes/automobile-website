const express = require('express');
const router = express.Router();
const User = require('../models/users')

// Get users
router.get('/users', (req, res) => {
  
    User.find().exec().then((users) => {
        res.render('users', {
            title: 'Customers',
            users: users
        })
    }).catch((err) => {
        res.json({message: err.message})
        console.log(err)
    });
});


module.exports = router;