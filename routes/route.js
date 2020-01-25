const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.render('index', { name: 'gymkhaana' });
});

module.exports = router;
