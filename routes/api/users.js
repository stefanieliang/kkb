var express = require('express');
var router = express.Router();
const {query} = require('../../models/db');
const md5 = require('md5');
const salt = 'take a little salt';

// 登录
router.post('/login', async (req, res) => {
    const {phone, password, autoLogin} = req.body;
    try {
        const sql = 'select * from user where phone=? and password=?';
        const results = await query(sql, [phone, md5(password + salt)]);
        if (results.length > 0) {
            const user = results[0];
            delete  user.password;
            //登录成功后需要在会话中保存登录状态
            if (autoLogin) {
                // 0.Cookie客户端、服务端存储少量数据，前后端都可以生成
                // 1.设置cookie：res.cookie()
                // 2.获取cookie：req.cookies.xxx | req.signedCookies.xxx

                // cookie解决方案，和session二选一
                // res.cookie('uid', user.id, {
                //     signed: true, // 签名,加密
                //     maxAge: 7*24*3600*1000, // 有效期
                //     httpOnly: true
                // })

                // 0.Session服务器存储数据(默认存储在内存，可设置为数据库存储)
                // 1.使用session:req.session.xxx
                req.session.cookie.maxAge = 7 * 24 * 3600 * 1000;
            }
            // session存储用户登录状态
            req.session.user = user;
            res.json({success: true, data: user});
        } else {
            res.json({success: false, message: '电话或密码错误！'});
        }
    } catch (e) {
        res.json({success: false, message: '服务器错误，请稍后重试！'});
    }
});

// 注册-校验手机号是否已存在
router.post('/verify-phone', async (req, res) => {
    try {
        const sql = 'select * from user where phone = ?';
        const results = await query(sql, req.body.phone);
        if (results.length > 0) {
            res.json({success: false, message: '电话号码已存在！'});
        } else {
            res.json({success: true});
        }
    } catch (e) {
        res.json({success: false, message: '服务器错误，请稍后重试！'});
    }
});

// 注册-校验图形验证码
router.post('/verify-code-img', async (req, res) => {
    const success = req.session.codeImg === req.body.code;
    res.json({success});
});

// 注册-生成图形验证码
const captcha = require('trek-captcha');
router.get('/code-img', async (req, res) => {
    try {
        // token是数字字母表示形式
        // buffer是图片数据
        const {token, buffer} = await captcha({size: 4});
        console.log(token);
        // 1.session 存储该token 在将来验证时使用
        req.session.codeImg = token;
        // 2.将图片数据返回给前端
        res.json({
            success: true,
            data: buffer.toString('base64') // 将图片转换为base64格式
        })
    } catch (e) {
        console.log(e);
    }
});

// 注册
router.post('/register', async (req, res) => {
    const sql = 'insert into user set ?';
    try {
        // 密码加密
        req.body.password = md5(req.body.password + salt);
        // 随机用户名
        req.body.username = '学员' + Date.now();
        const result = await query(sql, req.body);
        if (result.affectedRows > 0) {
            // 注册成功
            req.body.id = result.insertId; // 获取用户id
            delete req.body.password;
            // 保存用户信息
            req.session.user = req.body;
            res.json({success: true, data: req.body});
        } else {
            res.json({success: false, message: '注册失败！'});
        }
    } catch (e) {
        res.json({success: false, message: '服务器错误，请重试！'});
    }
});

// 验证用户是否登录
router.get('/is-login', (req, res) => {
    if (req.session.user) {
        // 已登录
        res.json({success: true, data: req.session.user});
    }
    else {
        res.json({success: false});
    }
});

router.post('/layout', (req, res) => {
    // 清除会话
    // req.session.user = null;
    // delete req.session.user;
    req.session.destroy((e) => {
        if (e) {
            res.json({success: false, message: '注销失败'})
        } else {
            res.json({success: true})
        }
    });
});

//multer 应用于单个路由
const multer = require('multer');
//自定义文件名
const storage = multer.diskStorage({
    destination: function (req, file, cb) {//存储目录
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        let extname = '';
        switch (file.mimetype) {
            case 'image/jpeg' :
                extname = '.jpeg';
                break;
            case 'image/png' :
                extname = '.png';
                break;
            case 'image/gif' :
                extname = '.gif';
                break;
        }
        cb(null, Date.now() + extname);
    }
});
//图片上传中间件
const upload = multer({
    // dest:'public/images',
    storage,
    limits: {fileSize: 2 * 1024 * 1024},//最大2M
    fileFilter: function (req, file, cb) {
        //判断文件是否合法
        if (file.mimetype === 'image/gif' ||
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/png') {
            //接受文件
            cb(null, true);
        } else {
            cb(new Error('请上传图片格式'), false);
        }
    }
});
router.post('/uploadAvatar', upload.single('file'),
    async (req, res) => {
        if (!req.file) {
            res.sendStatus(500)
        } else {
            try {
                // 更新session
                req.session.user.avatar = req.file.filename;
                // 更新 user 表中数据
                const result = await query(`update user set avatar = ? where id = ?`, [req.file.filename, req.session.user.id]);
                if (result.affectedRows > 0) {
                    res.json({success: true, data: req.file.filename})
                }

            } catch (e) {

            }
        }
    });

// 查询用户的所有课程
router.get('/my-courses', async (req, res) => {
    try {
        const sql = `SELECT c.id,c.name,c.phase,vc.poster from user_clazz uc LEFT JOIN clazz c ON uc.clazz_id=c.id
                    LEFT JOIN vip_course vc ON c.course_id=vc.id
                    WHERE user_id =?`
        const data = await query(sql,req.session.user.id);
        res.json({success:true,data})
    } catch (e) {

    }
})
module.exports = router;