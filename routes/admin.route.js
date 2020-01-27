const { Router } = require('express');
const passport = require('passport');

const router = Router();


router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/admin/login',
  failureFlash: true,
}));

router.get('/login', (req, res) => {
  res.render('login', { flash: req.flash() });
});

module.exports = router;
