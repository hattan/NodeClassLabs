var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', isAuthenticated, function(req, res) {
	var user = req.user;
  res.render('index',{ 
    title: 'Office Party',
    DisplayName : user.displayName(),
    ProfileImage : user.profileImage()
  });
});


module.exports = router;

router.get('/login', function(req, res) {
  res.render('login', { message: req.flash('message') });
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect : '/',
    failureRedirect : '/login'
}));

router.get('/signout', function(req, res) {
  req.logout();
  res.redirect('/');
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
}

