/**
 * Created by songsong on 2018/1/29.
 */
var express=require('express')
var app=express()
var path=require('path')
var history = require('connect-history-api-fallback');
var cookieParser = require('cookie-parser');
var bodyParser=require('body-parser')//需要安装
var expressSession=require('express-session')//安装
//解决服务器重启 数据丢失
var Question=require('./db/question')
var MongoStore=require('connect-mongo')(expressSession)

app.use(require('morgan')('short'));

(function() {
    // Step 1: Create & configure a webpack compiler
    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config.server.hot');
    var compiler = webpack(webpackConfig);

    // Step 2: Attach the dev middleware to the compiler & the server
    app.use(require("webpack-dev-middleware")(compiler, {
        noInfo: true, publicPath: webpackConfig.output.publicPath
    }));

    // Step 3: Attach the hot middleware to the compiler & the server
    app.use(require("webpack-hot-middleware")(compiler));
})();

// Do anything you like with the rest of your express application.



//静态文件根目录
app.use(express.static(path.resolve('./build')));

//获取user.js中req.body的中间件 extend处理查询字符串格式的请求体。会把这个字符串转成对象放在req.body上。
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
//同源
app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE');
    next();
})
//使用session
//app.use(cookieParser())
app.use(expressSession({
    resave:true,
    saveUninitialized:true,
    secret:'simba',
    /*cookie: {maxAge: 80000 },*/
    //session非常灵活，可以把session数据存在指定位置，默认是放在服务器的内存中，但也可以放在mongo数据库里
    store:new MongoStore({
        url:'mongodb://127.0.0.1/quiz'
    })
}))





app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/questions',function (req,res) {
    console.log('1111',req.params)
    /*Question.find({school:'文科'}).exec(function (err,questions) {
        if(!err){
            res.send({
                code:0,
                msg:'查询成功',
                data:questions
            })
        }
    })*/
    Question.find().limit(10).exec(function (err,questions) {
        console.log('rerr',err)
        if(!err){
            res.send({
                code:0,
                msg:'查询成功',
                data:questions
            })
        }
    })
})
/*Question.findById('5a6eac5aa658152778e0025b').exec(function (err,res) {
    console.log(err)
    console.log(res)
})
Question.find({school:'文科'}).exec(function (err,res) {
    console.log(res.length,'length')
})*/
app.get('/questions/:keyword',function (req,res) {
    console.log('keywodrd')
    var keyword=req.params.keyword
    var reg=new RegExp(keyword,'i')
    if(/ +/.test(keyword)){
        var keywords=[]
        keyword.replace(/(.+) +(.+)/,function ($0,$1,$2) {
            keywords.push($1)
            keywords.push($2)
        })
        console.log(keywords)
        reg=new RegExp(keywords[0]+'.+'+keywords[1],'i')
    }
    Question.find({'$or':[{quiz:reg},{options:reg}]}).exec(function (err,questions) {
        console.log('rerr',err)
        //console.log('questions',questions.length)
        if(!err){
            res.send({
                code:0,
                msg:'查询成功',
                data:questions
            })
        }
    })
})

if (require.main === module) {
    app.listen(80,function () {
        console.log('pott in 80')
    })
}

