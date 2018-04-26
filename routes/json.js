var express = require('express');
var router = express.Router();
var pool = require('../config/pool');
var fs = require("fs");
var path = require("path");
/* post api . */
router.get('/:filename', function (req, res, next) {
    var filename = req.params.filename;
    fs.readFile(path.resolve(__dirname, "../json", filename + ".json"), "utf8",function (error, data) 
    {
        res.send(data);
    })


});


module.exports = router;