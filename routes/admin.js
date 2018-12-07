var express = require('express');
var router = express.Router();
const {query} = require('../models/db');

router.get('/', async function(req, res, next) {
  //重定向里的地址应该是完整地址
  res.redirect('/admin/open-courses');
});
router.get('/open-courses-update/:id',async function(req, res, next) {
    try {
        const courses =await query('select * from open_course where id = ?',req.params.id);
        if(courses.length>0){
            const course = courses[0];
            course.time = course.time.toISOString().substr(0,16);
            res.render('admin/open-courses-update',{
                layout:'layout-admin',//设置布局页
                nav:'open-courses',
                course
            })
        }else{
            res.render('admin/open-courses-update',{
                layout:'layout-admin',//设置布局页
                message:'查询公开课失败'
            })
        }
    }catch (e) {
        res.render('admin/open-courses-update',{
            layout:'layout-admin',//设置布局页
            message:'查询公开课失败'
        })
    }
});

//http://localhost:8080/admin/open-courses/
router.get('/open-courses',async function(req, res, next) {
    try {
        const courses =await query('select * from open_course');
        res.render('admin/open-courses',{
            layout:'layout-admin',//设置布局页
            nav:'open-courses',
            courses
        })
    }catch (e) {
        res.render('admin/open-courses',{
            layout:'layout-admin',//设置布局页
            message:'查询公开课失败'
        })
    }
});

//处理公开课新增
//multer 应用于单个路由
const multer = require('multer');
//自定义文件名
const storage = multer.diskStorage({
    destination:function (req,file,cb) {//存储目录
        cb(null,'public/images');
    },
    filename:function (req,file,cb) {
        let extname = '';
        switch (file.mimetype) {
            case 'image/jpeg' : extname = '.jpeg';break;
            case 'image/png' : extname = '.png';break;
            case 'image/gif' : extname = '.gif';break;
        }
        cb(null,Date.now() + extname);
    }
});
//图片上传中间件
const upload = multer({
    // dest:'public/images',
    storage,
    limits:{fileSize:2*1024*1024},//最大2M
    fileFilter:function (req,file,cb){
        //判断文件是否合法
        if(file.mimetype === 'image/gif' ||
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/png'){
            //接受文件
            cb(null,true);
        }else {
            cb(new Error('请上传图片格式'),false);
        }
    }
});
//表单校验中间件
const {body,validationResult} = require('express-validator/check');
const validations = [
    body('name').not().isEmpty().withMessage('公开课名称必填'),
    body('description').not().isEmpty().withMessage('公开课描述信息必填'),
    body('time').not().isEmpty().isAfter(new Date().toString()).withMessage('截止日期必须晚于当前时间'),
];
const mysql = require('mysql');
router.post('/open-courses',
    [upload.single('file'),...validations],//同时执行多个中间件，用数组形式,...是数组脱壳
    async (req, res, next)=> {

        // req.file 获取上传文件的信息
        //如果用户有新的上传，将覆盖旧的值
        if(req.file){
            req.body.poster = req.file.filename;
        }

    //0.数据的校验结果判断
        const errors = validationResult(req).formatWith(({msg})=>msg);
        //上一行等效于 const errors = validationResult(req).formatWith((error)=>error.msg);
        if(errors.isEmpty()){
            //校验通过
            let message ='';
            try {
                let sql, oper;
                //可以根据数据中是否存在id来判断是新增还是更新
                console.log('11111111111')
                if(req.body.id){
                    const id = req.body.id;
                    delete req.body.id;
                    //mysql.format生成sql语句，避免sql注入攻击
                    sql = mysql.format( 'update open_course set ? where id = ?',[req.body,id]);
                    oper = '更新'
                }else{
                    sql = mysql.format( 'insert into open_course set ? ',req.body);
                    oper = '新增';
                }
                //2.保存数据到数据库
                const result = await query(sql);
                message = result.affectedRows>0? `${oper}成功` : `${oper}失败`;
                res.render('admin/result',{
                    layout:'layout-admin',//设置布局页
                    message
                })
            }catch (e) {
                console.log(e);
                res.render('admin/result',{
                    layout:'layout-admin',//设置布局页
                    message
                })
            }
        }else {
            //校验失败
            res.render('admin/result',{
                layout:'layout-admin',//设置布局页
                message:'新增失败',
                errors:errors.array()
            })
        }
});

router.get('/vip-courses',async function(req, res, next) {
    res.render('admin/vip-courses',{
        layout:'layout-admin',//设置布局页
        nav:'vip-courses'
    })
});

module.exports = router;
