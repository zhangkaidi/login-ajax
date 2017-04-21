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
            for (var i = 0; i < dataObj.person.length; i++) {
                if (dataObj.person[i].id == personData.id && dataObj.person[i].pwd == personData.pwd) {
                    res.json({ result: true })
                    return;
                } else {
                    res.json({ result: false })
                    return;
                }
            }
           
        }
    });
});

module.exports = router;