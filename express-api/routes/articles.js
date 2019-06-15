var express = require('express');
var router = express.Router();
const articles = require('../controllers/articles');

router.post('/', articles.create);
router.get('/', articles.findAll);
router.get('/:articleId', articles.findOne);
router.put('/:articleId', articles.update);
router.delete('/:articleId', articles.delete);

module.exports = router;
