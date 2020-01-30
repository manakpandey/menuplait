const { Router } = require('express');
const { getMenu, postOrder } = require('../controllers/menu.controller');

const router = Router();

router.get('/', getMenu);

router.post('/', postOrder);

module.exports = router;