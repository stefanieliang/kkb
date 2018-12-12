var express = require('express');
var router = express.Router();
const {query} = require('../../models/db');

router.post('/login', async(req, res)=>
{
    const {phone, password} = req.body;
    try {
        const sql = 'select * from user where phone=? and password=?';
        const results = await query(sql, [phone, password]);
        if (results.length > 0) {
            const user = results[0];
            delete  user.password;
            //登录成功后需要在会话中保存登录状态
            req.session.user = user;
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

module.exports = router;