var express = require('express');
var fs = require('fs');
var router = express.Router();
var DataAccessor = require('../code/userAccessor');
var accessor = new DataAccessor();

/* GET home page. */
router.get('/', function (req, res) {
    res.json({ result: accessor.remove(req.query.name) })
});

module.exports = router;