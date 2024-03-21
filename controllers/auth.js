const bcrypt = require('bcrypt');
const User = require('../models/users')
const express = require('express');

const app = express();
app.use(express.json());

// Register a new user
const register = async (req, res, next) => {
  const data = {
    username: req.body.username.trim().toLowerCase(),
    email: req.body.email,
    password: req.body.password,
  }
  try {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword;
    
    const user = await User.insertMany(data);
    
    req.session.message = {
      type: 'success',
      message: "Your account has been created!"
    };
    
    res.redirect('/auth/login');
  } catch (error) {
    req.session.message = {
      type: 'danger',
      message: 'Username or email already exists!'
    };
    res.redirect('/auth/signup');
    next(error);
  }

};

// Login with an existing user
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      req.session.message = {
        type: 'danger',
        message: 'User does not exist'
      };
      
      return res.redirect('/auth/login');
    }

    const passwordMatch = await user.validPassword(req.body.password);
    if (!passwordMatch) {
      req.session.message = {
        type: 'danger',
        message: 'Invalid password!'
      };
      return res.redirect('/auth/login');
    }

    req.session.user = user;

    req.session.message = {
      type: 'success',
      message: `Welcome back ${user.username}!`
    };
    
    res.redirect('/user/profile');
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  req.session.destroy()
  res.redirect('/auth/login');
}


// This function renders the signup page with the provided title and user information.
const signup_page = (req, res) => {
  res.render('auth/signup', {title: 'Registration',
  user: req.session.user});
}

// This function renders the login page with the provided title and user information.
const login_page = (req, res) => {
  res.render('auth/login', {title: 'Login to continue',
  user: req.session.user});
}

// This function renders the login page with the provided title and user information.
const logout_page = (req, res) => {
  res.render('auth/logout', {title: 'Logout confirmation',
  user: req.session.user});
}

module.exports = { register, login, logout, login_page, signup_page, logout_page};