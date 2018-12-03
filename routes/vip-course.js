const express = require('express');
const router = express.Router();
var createError = require('http-errors');//创建错误对象

/* GET users listing. */
router.get('/:course', function(req, res, next) {
    //传参方式2
    res.locals.bar = 'foo';

    //方式一：获取url参数，req.params
    console.log(req.params.course);
    //方式二：获取查询参数，req.query
    console.log(req.query.a);
    //方式三：请求体body

    //错误处理
    const title =getTitle(res,req.params.course);
    const type = 'aaa';
    if(title){
        res.render('vip-course/'+req.params.course,
            {
                layout:'layout',
                title:title,
                htmlStr:'<h3>htmlString</h3>',
                bool:true,
                abc:false,
                arr:[
                    {
                        name:'tom',
                        city:{cname:'北京'},
                        hobby:['篮球','足球']
                    },{
                        name: 'jerry',
                        city:{cname:'上海'},
                        hobby:['羽毛球','乒乓球']
                    }],
                obj:{
                    foo:'bar'
                },
                typeSwitch:{
                    isAAA :type =='aaa',
                    isBBB :type=='bbb',
                    isCCC :type=='ccc'
                },
                birthday:new Date(),
                a:true,
                b:true
            });//此处传参方式优先级更高
    }else{
        //没有匹配的vip课程
        //错误处理方式1：:404页面
        // next(new Error('没有您要的课程！'));//状态码500
        // next(createError(404,'没有您要的课程！'));//状态码404

        //错误处理方式2：:重定向
       // res.redirect('/vip-course/web')//为完整的路由地址
    }
});
//获取当前页面标题
function getTitle(res,course){
    for (const c of res.locals.courses) {
        if(c.url.indexOf(course)!=-1){
            return c.name;
        }
        return '';
    }

}
module.exports = router;
