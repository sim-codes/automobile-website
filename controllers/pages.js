/**
 * Renders the index page with the provided title and user information.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const index = (req, res) => {
    res.render('index', {title: 'Welcome to Many Men',
    user: req.session.user});
}

// This function renders the services page with the provided title and user information.
const services = (req, res) => {
    res.render('services', {title: 'Services',
    user: req.session.user});
}

// This function renders the ourWorks page with the provided title and user information.
const ourWorks = (req, res) => {
    res.render('ourWorks', {title: 'Our Work',
    user: req.session.user});
}

// This function renders the about page with the provided title and user information.
const about = (req, res) => {
    res.render('about', {title: 'About Us',
    user: req.session.user});
}

// This function renders the contact page with the provided title and user information.
const contact = (req, res) => {
    res.render('contact', {title: 'Contact Us',
    user: req.session.user});
}

module.exports = { index, services, ourWorks, about, contact };
