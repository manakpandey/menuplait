const { Router } = require('express');

const router = Router();

const menu=[['Food 1','200'],['Food 2','180'],['Food 3', '210'],['Food 4','500'],['Food 5','99']]

router.get('/', (req, res) => {
  res.render('index', { menu: menu });
});

module.exports = router;
