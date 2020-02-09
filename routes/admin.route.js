const { Router } = require('express');
const passport = require('passport');
const {
  getDashboard, getAlterMenu, markAsComplete, getOrderHistory, getIncompleteOrders,
} = require('../controllers/admin.controller');
const { postAddMenuItem, modifyMenuItem, addCategory } = require('../controllers/modifyMenu.controller');

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
router.post('/addCategory', addCategory);
router.post('/modifyMenu', modifyMenuItem);
router.post('/markAsComplete', markAsComplete);
router.get('/orders', getOrderHistory);
router.get('/incompleteOrders', getIncompleteOrders);

module.exports = router;
