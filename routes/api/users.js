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
module.exports = router;