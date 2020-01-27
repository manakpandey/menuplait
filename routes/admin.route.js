const { Router } = require('express');
const passport = require('passport');

const router = Router();


router.post('/login', passport.authenticate('local', {
  successRedirect: '/admin',
  failureRedirect: '/admin/login',
  failureFlash: true,
}));

router.get('/login', (req, res) => {
  res.render('login', { flash: req.flash().error });
});

router.get('/', (req, res) => {
  if (!req.user) {
    res.redirect('/admin/login');
    return;
  }
  res.render('admin');
});

module.exports = router;
