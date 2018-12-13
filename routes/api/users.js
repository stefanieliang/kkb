var express = require('express');
var router = express.Router();
const {query} = require('../../models/db');
const md5 = require('md5');
const salt = 'take a little salt';

// 登录
router.post('/login', async(req, res)=>
{
    const {phone, password,autoLogin} = req.body;
    try {
        const sql = 'select * from user where phone=? and password=?';
        const results = await query(sql, [phone, md5(password+salt)]);
        if (results.length > 0) {
            const user = results[0];
            delete  user.password;
            //登录成功后需要在会话中保存登录状态
            if(autoLogin){
                req.session.user = user;
            }

            res.json({success: true, data: user});
        }else {
            res.json({success: false, message: '电话或密码错误！'});
        }
    } catch (e) {
        res.json({success: false, message: '服务器错误，请稍后重试！'});
    }
});

// 注册-校验手机号是否已存在
router.post('/verify-phone',async (req,res)=>{
    try {
        const sql = 'select * from user where phone = ?';
        const results = await query(sql,req.body.phone);
        if(results.length>0){
            res.json({success:false,message:'电话号码已存在！'});
        }else {
            res.json({success:true});
        }
    }catch (e) {
        res.json({success:false,message:'服务器错误，请稍后重试！'});
    }
});

// 注册-校验图形验证码
router.post('/verify-code-img',async (req,res)=>{
    const success = req.session.codeImg === req.body.code;
    res.json({success});
});

// 注册-生成图形验证码
const captcha = require('trek-captcha');
router.get('/code-img',async (req,res)=>{
    try {
        // token是数字字母表示形式
        // buffer是图片数据
        const {token,buffer} =await captcha({size:4});
        console.log(token);
        // 1.session 存储该token 在将来验证时使用
        req.session.codeImg = token;
        // 2.将图片数据返回给前端
        res.json({
            success:true,
            data:buffer.toString('base64') // 将图片转换为base64格式
        })
    }catch (e) {
        console.log(e);
    }
});

// 注册
router.post('/register',async (req,res)=>{
    const sql = 'insert into user set ?';
    try {
        // 密码加密
        req.body.password = md5(req.body.password +salt);
        // 随机用户名
        req.body.username = '学员'+Date.now();
        const result = await query(sql,req.body);
        if(result.affectedRows>0){
            // 注册成功
            req.body.id = result.insertId; // 获取用户id
            delete req.body.password;
            // 保存用户信息
            req.session.user = req.body;
            res.json({success:true,data:req.body});
        }else{
            res.json({success:false,message:'注册失败！'});
        }
    }catch (e) {
        res.json({success:false,message:'服务器错误，请重试！'});
    }
});

module.exports = router;