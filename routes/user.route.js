const { Router } = require('express');
const {
  getMenu, postOrder, getUserOrders, postUserOrders,
} = require('../controllers/user.controller');

const router = Router();

router.get('/', getMenu);

router.post('/', postOrder);

router.get('/userOrders', getUserOrders);

router.post('/userOrders', postUserOrders);

module.exports = router;
