var express = require('express');
var router = express.Router();
var fs = require('fs');
var DataAccessor = require('../code/userAccessor');
var accessor = new DataAccessor();

/* GET home page. */
router.get('/', function (req, res) {
    var user = accessor.get();
    res.render('index', { dataObj: user });
});

module.exports = router;