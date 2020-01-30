const { Router } = require('express');
const passport = require('passport');
const { getDashboard, postAddMenuItem } = require('../controllers/admin.controller');

const router = Router();


router.post('/login', passport.authenticate('local', {
  successRedirect: '/admin',
  failureRedirect: '/admin/login',
  failureFlash: true,
}));

router.get('/login', (req, res) => {
  res.render('login', { flash: req.flash().error });
});

router.get('/', getDashboard);
router.post('/addMenuItem', postAddMenuItem);

module.exports = router;
