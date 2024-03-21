module.exports = function (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.message = {
            type: 'danger',
            message: 'Login to continue'
          };
        res.redirect('/auth/login');
    }
}