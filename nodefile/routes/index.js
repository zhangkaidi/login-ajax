var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res) {
    fs.readFile('PersonData.json', 'utf8', function (err, data) {
        if (err) {
            return console.error(err);
        } else {
            var dataObj = eval("(" + data + ")");
        }
        res.render('index', { dataObj: dataObj });
    });
});

module.exports = router;