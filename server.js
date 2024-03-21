require('dotenv').config(); // Load environment variables from .env file
const express = require('express'); // Import express for server creation
const mongoose = require('mongoose'); // Import mongoose for MongoDB object modeling
const session = require('express-session'); // Import express-session for session management
const connectDB = require('./config/db'); // Import the function to connect to the database
const authRoutes = require('./routes/auth'); // Import authentication routes
const profileRoute = require('./routes/profile'); // Import profile routes
const pagesRoutes = require('./routes/pages'); // Import page routes
const bookingRouters = require('./routes/bookings'); // Import booking routes
const users = require('./routes/routes')


const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
    secret: 'my secret key',
    saveUninitialized: true,
    resave: false,
    cookie: {}
}));

// Middleware to handle session messages
app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

// set template engine
app.set('view engine', 'ejs');

//define static folder
app.use("/images", express.static('public/images'));
app.use("/css", express.static('public/css'));
app.use("/js", express.static('public/js'));

// Get all site users
app.get('/users', users);

// route prefix
app.use("", pagesRoutes);

// Define authentication routes
app.use('/auth', authRoutes);

// Dashboard routes
app.use('/user', profileRoute);

// Booking routes
app.use('/bookings', bookingRouters);


// Error handling
app.use((req,res) => {
    res.status(404).render('error/404', 
    {title: '404',
    user: req.session.user});
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).render('error/500', 
    {title: 'Internal Server Error',
    user: req.session.user});
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});