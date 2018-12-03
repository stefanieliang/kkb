const express = require('express');
const router = express.Router();

const moment = require('moment');//生成时间戳使用
const md5 = require('md5');//加密
const axios = require('axios');//
const qs = require('querystring');
const {query} = require('../../models/db');

router.get('/:phone',async function(req, res, next) {
    //1.生成6位随机码
    const code = ran()+ran()+ran()+ran()+ran()+ran();
    console.log(code);

    //2.调用秒滴借口，提前构造参数
    const url='https://api.miaodiyun.com/20150822/query/accountInfo';
    const to = req.params.phone;//发送目标手机号
    const accountSid = '3324eab4c1cd456e8cc7246176def24f';//账号
    const authToken = 'b1c4983e2d8e45b9806aeb0a634d79b1';//令牌
    const templateid = '613227680';//短信模板id
    const param = `${code},1`//短信参数
    const now =moment();
    const timestamp = now.format('yyyyMMddHHmmss');
    const sig = md5(accountSid + authToken + timestamp);//签名

    //3.发送请求
    try{
        const resp = await axios.post(url
            ,qs.stringify(to,accountSid,templateid,param,timestamp,sig),
            {headers:
                    {'Content-type':'application/x-www-form-urlencoded'}});
        console.log(resp.data);
        //4.验证发送结果
        if(resp.data.respCode === '00000'){
            //短信发送成功
            //5.存储验证码和有效期
            const expires = moment().add(1,'minutes').toDate();
            const result = await query(
                'insert into verify_code set ?',
                {phone:to,code,expires}
            );
            if(result.affectedRows > 0){
                //插入成功
                res.json({success:true,code})//code仅开发使用
            }else{
                res.json({success:true,message:'发送验证码失败'})//code仅开发使用
            }
        }else{
            res.json({success:true,message:'发送验证码失败'})//code仅开发使用
        }
    }catch (e) {
        console.log(e);
        res.json({success:true,message:'发送验证码失败'})//code仅开发使用
    }
});

function ran(){
    return Math.floor(Math.random()*10).toString();
}

//验证码的校验
router.post('/',async (req,res)=>{
   try {
       const sql = 'select * from verify_code where phone = ? and code = ?';
       const {phone,code} = req.body;
       const results = await query(sql,[phone,code]);
       if(results.length > 0){
           //存在匹配项，验证是否过期
           const expires = results[0].expires;
           if(expires - new Data() > 0){
               //有效
               res.json({success:true});
           }else{
               res.json({success:false,message:'验证码已失效'});
           }
           //删除记录

       }else{
           res.json({success:false,message:'手机号或验证码有误'});
       }
   }catch (e) {
       res.json({success:false,message:'服务器错误，请稍后重试'});
   }
});
module.exports = router;