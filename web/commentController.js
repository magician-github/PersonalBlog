var path = new Map();
var blog = require('../dao/blogDao.js');
var tagDao = require('../dao/tagsDao.js');
var timeUtil = require('../util/TimeUtil.js');
var respUtil = require('../util/RespUtil.js');
var tagBlogMappingDao = require('../dao/tagBlogMapping.js');
var commentDao = require('../dao/commentDao.js');
var url = require('url');
var captcha = require('svg-captcha');
function  addComment(request,response) {
    var params = url.parse(request.url,true).query;
    commentDao.insertComment(parseInt(params.bid),params.userName,params.email,params.content,timeUtil.getNow(),timeUtil.getNow(),parseInt(params.parent),params.parentName, function (result) {

        response.writeHead(200);
        response.write(respUtil.writeResult('success','评论成功',null));
        response.end();
    })


}
path.set('/addComment',addComment);
function  queryRandomCode(request,response) {
    var img = captcha.create({width:100,height:34,fontSize:50});
    response.writeHead(200);
    response.write(respUtil.writeResult('success','获取验证码成功',img));
    response.end();
}
path.set('/queryRandomCode',queryRandomCode);
function queryBlogCommentsById(request,response) {
    var params = url.parse(request.url,true).query;
    commentDao.queryBlogCommentsById(parseInt(params.bid),function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success','查询成功',result));
        response.end();
    })

}
path.set('/queryBlogCommentsById',queryBlogCommentsById)
function queryRecentCommen(request,response) {
    commentDao.queryRecentCommen(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success','查询成功',result));
        response.end();
    })
}
path.set('/queryRecentCommen',queryRecentCommen);
function queryBlogCommentsCountById(request,response) {
    var params = url.parse(request.url,true).query;
    console.log(params.bid);
    commentDao.queryBlogCommentsCountById(params.bid, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success','查询成功',result));
        response.end();


    })

}
path.set('/queryBlogCommentsCountById',queryBlogCommentsCountById)
module.exports.path = path;