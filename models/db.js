//连接数据库
const mysql = require('mysql');

const cfg = {
    host:'localhost',
    user:'kaikeba_admin',
    password:'admin',
    database:'kkb'
}
module.exports = {
    query:function (sql,value) {
        return new Promise((resolve,reject)=>{
            const conn = mysql.createConnection(cfg);
            conn.connect();//此步骤可省略
            conn.query(sql,value,(err,results)=>{
                if(err) reject(err);
                else resolve(results);
            });
            conn.end();
        });
    }
}