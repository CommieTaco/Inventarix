var express = require('express');
var router = express.Router();
const users = require('../controllers/users');

router.post('/', users.create);
router.get('/', users.findAll);
router.post('/auth', users.auth);
router.get('/:userId', users.findOne);
router.put('/:userId', users.update);
router.delete('/:userId', users.delete);

module.exports = router;
