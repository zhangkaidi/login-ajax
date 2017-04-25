var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    fs.readFile('PersonData.json', 'utf8', function (err, data) {
        if (err) {
            return console.error(err);
        } else {
            var dataObj = eval("(" + data + ")");
            var personData = {
                id: req.query.id,
                pwd: req.query.pwd
            }
            var result = false;
            for (var i = 0; i < dataObj.length; i++) {
                if (dataObj[i].id == personData.id && dataObj[i].pwd == personData.pwd) {
                    result == true;
                    res.json({ result: true })
                    return;
                }
            }
            if (result == false) {
                res.json({ result: false })
                return;
            }
        }
    });
});

module.exports = router;