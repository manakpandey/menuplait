const { Router } = require('express');
const { getMenu, postOrder } = require('../controllers/user.controller');

const router = Router();

router.get('/', getMenu);

router.post('/', postOrder);

module.exports = router;
