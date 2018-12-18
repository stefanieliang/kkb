const createError = require('http-errors');//创建错误对象
const express = require('express');
const path = require('path');//处理路径相关
const cookieParser = require('cookie-parser');//cookie解析
const logger = require('morgan');//日志
const helper = require('./helpers');//注册hbs的帮助方法
const cors = require('cors');

//导入自定义中间件
const {initLocals} = require('./middleware');

//导入路由相关模块
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const openCoursesRouter = require('./routes/open-courses');
const vipCourseRouter = require('./routes/vip-course');
const adminRouter = require('./routes/admin');
const codeRouter = require('./routes/api/code');

const app = express();

// view engine setup，视图引擎设置，__dirname当前文件的绝对路径
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


//应用中间件
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));//解决跨域
app.use(logger('dev'));//日志
app.use(express.json());//获取ajax传递json
app.use(express.urlencoded({extended: false}));//解析url参数
app.use(cookieParser('its a secret'));//cookie解析,'its a secret'是cookie的加密字段
//配置session,需要在cookie下面
const session = require('express-session');
const Store = require('express-mysql-session')(session);
const {pool} = require('./models/db');
const store = new Store(null, pool);
app.use(session({
    store,// 设置session存储为mysql,注意当前用户需要有表的创建权限
    secret: 'its a secret',//密钥
    resave: false,//强制保存会话到存储（默认的是内存）中
    saveUninitialized: false,//保存未初始化的session到存储中
    // 如果不设置cookie中的maxAge，则session只在当前打开时有效
    // 若关闭页面，则session失效
    // cookie:{maxAge: 7*24*60*60*1000}
}));
//设置静态目录
app.use(express.static(path.join(__dirname, 'public')));

//注册自定义的中间件
app.use(initLocals);

//路由注册
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/open-courses', openCoursesRouter);
app.use('/vip-course', vipCourseRouter);
app.use('/admin', adminRouter);
app.use('/api/code', codeRouter);
app.use('/api/users', require('./routes/api/users'));
app.use('/api/courses', require('./routes/api/course'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
