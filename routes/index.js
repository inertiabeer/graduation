var express = require('express');
var router = express.Router();
var path=require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(__dirname,'../views/echart.html'));
});
router.get('/echart', function (req, res, next) {
  res.sendFile(path.resolve(__dirname, '../views/echart.html'));
});


module.exports = router;
