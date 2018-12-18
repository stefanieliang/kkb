const express = require('express');
const router = express.Router();
const {query} = require('../../models/db');


// 搜索
router.get('/search',async (req,res)=>{
    try {
        const sql = `select * from vip_course where name like '%${req.query.keyword}%'`;
        const results = await query(sql);
        res.json({success:true,data:results})
    }catch (e) {
        res.json({success:false,message:'搜索错误！'})
    }

});

module.exports = router;