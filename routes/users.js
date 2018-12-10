const express = require('express');
const router = express.Router();

const users = [
    {name:'tom',age:20}
];

/* GET users listing. */
router.get('/', function(req, res, next) {
    //0.设置状态码200
    //1.设置了响应头content-type:application/json
    //2.返回数据JSON.stringify(obj)
    res.json(users);//等效于res.send(users)
});

//新增
router.post('/', function(req, res) {
    //传递参数三：req.body
    // console.log(req.body);
    //contentType:application/json

    //将传递过来的用户数据添加至users
    try {
        users.push(req.body);
        res.json({success:true,users});
    }catch (e) {
        res.json({success:false});
    }
});

//更新
router.put('/', function(req, res) {
    try {
        const index = users.findIndex(u=>u.name==req.body.name);
        if(index!=-1){
            users[index] = req.body;
            res.json({success:true,users});
        }else{
            res.json({success:false});
        }
    }catch (e) {
        res.json({success:false});
    }
});

//删除
router.delete('/:name', function(req, res) {
    try {
        const index = users.findIndex(u=>u.name==req.params.name);
        if(index!=-1){
            users.splice(index,1);
            res.json({success:true,users});
        }else {
            res.json({success:false});
        }
    }catch (e) {
        res.json({success:false});
    }
});

//1.跨域jsonp,接口必须是get方法,传递参数只能是url方式
router.get('/jsonp',(req,res)=>{
    //参数通过查询参或者url参数获取
    // console.log(req.query);
    res.jsonp(users);
    //底层的实现原理，callback是回调函数名
    // res.send(`${req.query.callback}(${JSON.stringify(users)})`) //es6
    // res.send(req.query.callback+'('+JSON.stringify(users)+')') //es5
});

//2.跨域，使用代理

//3跨域，cors get
router.get('/cors',(req,res)=>{
    //添加响应头Access-Control-Allow-Origin
    res.set('Access-Control-Allow-Origin','http://localhost:8080');
    res.json(users);
});

//cors预检测
// router.options('/cors',(req,res)=>{
//     res.set('Access-Control-Allow-Origin','http://localhost:8080');
//     res.set('Access-Control-Allow-Headers','Content-Type');
//     res.set('Access-Control-Allow-Methods','GET,POST,PUT');
//     res.set('Access-Control-Allow-Credentials','true');
//     res.sendStatus(204);
// });

//3跨域，cors post
router.post('/cors',(req,res)=>{
    users.push(req.body);
    //添加响应头Access-Control-Allow-Origin
    res.set('Access-Control-Allow-Origin','http://localhost:8080');
    res.json(users);
});

//3跨域，cors put
// router.put('/cors',(req,res)=>{
//     res.set('Access-Control-Allow-Origin','http://localhost:8080');
//     const index = users.findIndex(u=>u.name==req.body.name);
//     if(index!=-1){
//         users[index] = req.body;
//         res.json({success:true,users});
//     }else {
//         res.json({success:false});
//     }
// });

//3跨域，cors Credentials
router.put('/cors',(req,res)=>{
    res.set('Access-Control-Allow-Origin','http://localhost:8080');
    res.set('Access-Control-Allow-Credentials','true');
    const index = users.findIndex(u=>u.name==req.body.name);
    if(index!=-1){
        users[index] = req.body;
        res.json({success:true,users});
    }else {
        res.json({success:false});
    }
});

module.exports = router;
