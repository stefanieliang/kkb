var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //渲染页面
  res.render('index', {
    title: 'Express1122',
      showVideo:false,

  });
});

module.exports = router;
