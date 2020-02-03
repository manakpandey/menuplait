const { Router } = require('express');
const passport = require('passport');
const { getDashboard, getAlterMenu } = require('../controllers/admin.controller');
const { postAddMenuItem, modifyMenuItem } = require('../controllers/modifyMenu.controller');

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
router.get('/menu', getAlterMenu);
router.post('/addMenuItem', postAddMenuItem);
router.post('/modifyMenu', modifyMenuItem);

module.exports = router;
