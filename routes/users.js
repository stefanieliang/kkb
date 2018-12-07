var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users');
});

router.post('/', function(req, res, next) {
    //传递参数三：req.body
    // console.log(req.body);
    //contentType:application/json
    res.send('服务器接收到你的请求参数了！');
});

module.exports = router;
