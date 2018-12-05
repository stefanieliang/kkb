const express = require('express');
const router = express.Router();
const {query} = require('../models/db');
/* GET users listing. */
router.get('/',async function(req, res, next) {
    //查询公开课
    try{
        const currentPage = req.query.page || 1;//获取当前页码，如没有则默认1
        const pageSize = req.query.pageSize ||5;//每页条数
        const offset = (currentPage-1)*pageSize;//计算偏移量
        const sql = 'SELECT * FROM kkb.open_course order by time desc limit ?,?';//limit 偏移量，每页条数
        const results = await query(sql,[offset,pageSize]);
        for (const result of results) {
            const now = new Date();
            const endTime =new Date(result.time);
            if(now-endTime > 0){
                //已结束，看回放
                result.notBegin = false;
            }else{
                result.notBegin = true;
            }
        }
        res.render('open-courses',{
            title:'公开课',
            openCourses:results
        });
    }catch (e) {
        console.log(e);
        next(e);
    }
});

module.exports = router;

