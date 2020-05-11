var express = require('express');
var globalConfig = require('./config');
var loader = require('./loader')

var app = new express();
app.use(express.static('./page'));
app.post('/editEveryDay',loader.get('/editEveryDay'));
app.post("/editBlog",loader.get("/editBlog"));
app.get('/queryBlogCount',loader.get('/queryBlogCount'));
app.get('/queryHotTitleByViews',loader.get('/queryHotTitleByViews'));
app.get('/queryBlogById',loader.get('/queryBlogById'));
app.get('/queryBlogByPage',loader.get('/queryBlogByPage'));
app.get('/queryAllBlog',loader.get('/queryAllBlog'));
app.post('/addComment',loader.get('/addComment'));
app.get('/queryRandomCode',loader.get('/queryRandomCode'));
app.get('/queryBlogCommentsById',loader.get('/queryBlogCommentsById'));
app.get('/queryRecentCommen',loader.get('/queryRecentCommen'));
app.get('/queryBlogCommentsCountById',loader.get('/queryBlogCommentsCountById'));
app.post('/editEveryDay',loader.get('/editEveryDay'));
app.get('/queryEveryDay',loader.get('/queryEveryDay'));
app.get('/queryRandomTag',loader.get('/queryRandomTag'));
app.get('/queryRecentCommen',loader.get('/queryRecentCommen'));
app.get('/queryByTagCount',loader.get('/queryByTagCount'));
//app.post('/blog/addBlog',loader.get('/blog/addBlog'));





app.listen(globalConfig.port,function (){
    console.log("服务已经启动");
})