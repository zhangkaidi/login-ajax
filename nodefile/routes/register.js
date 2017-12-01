var express = require('express');
var fs = require('fs');
var router = express.Router();
var User = require('../model/User.js');
var DataAccessor = require('../code/userAccessor');
var accessor = new DataAccessor();

/* GET home page. */
router.get('/', function (req, res) {
    var user = new User(
        req.query.name,
        req.query.password
    );
    res.json({ success: accessor.add(user) });
});

module.exports = router;