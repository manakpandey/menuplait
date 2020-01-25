const { Router } = require('express');

const router = Router();

const menu = [['Food 1', '200', true], ['Food 2', '180', true], ['Food 3', '210', false], ['Food 4', '500', true], ['Food 5', '99', true]];

router.get('/', (req, res) => {
  res.render('index', { menu });
});

module.exports = router;
