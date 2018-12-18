const express = require('express');
const router = express.Router();
const {query} = require('../../models/db');


// 搜索
router.get('/search',async (req,res)=>{
    try {
        const sql = `select * from vip_course where name like ?`;
        // 用此种方式查询，防止sql注入
        const results = await query(sql,'%'+req.query.keyword+'%');
        res.json({success:true,data:results})
    }catch (e) {
        res.json({success:false,message:'搜索错误！'})
    }

});

module.exports = router;