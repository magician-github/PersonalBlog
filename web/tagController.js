var path = new Map();
var blog = require('../dao/blogDao.js');
var tagDao = require('../dao/tagsDao.js');
var timeUtil = require('../util/TimeUtil.js');
var respUtil = require('../util/RespUtil.js');
var tagBlogMappingDao = require('../dao/tagBlogMapping.js');
var url = require('url');
function  queryRandomTag(request,response){
    tagDao.queryAllTag(function (result) {
        result.sort(function () {
            return Math.random() - 0.5 > 0;

        })
        response.writeHead(200);
        response.write(respUtil.writeResult('success','查询成功',result));
        response.end();

    })

}

path.set('/queryRandomTag',queryRandomTag)
function  queryByTag(request,response){
    var params = url.parse(request.url,true).query;
    tagDao.queryTag(params.tag, function (result) {
        if(result == null || result.length == 0){
            response.writeHead(200);
            response.write(respUtil.writeResult('success','查询成功',result));
            response.end();

        }else {

            tagBlogMappingDao.queryByTag(result[0].id,parseInt(params.page),parseInt(params.pageSize), function (result) {

                var blogList = [];
                for(var i = 0;i<result.length;i++){
                    blog.queryBlogById(result[i].blog_id, function (result) {
                        blogList.push(result[0]);
                        
                    })
                }
            getResult(blogList,result.length,response);

            })
        }

    })



}
path.set('/queryByTag',queryByTag)
function getResult(blogList,len,response){
    if(blogList.length < len) {
        setTimeout(function () {
            getResult(blogList,len,response);

        },10)
    }else {
        for(var i = 0 ;i< blogList.length;i++){
            blogList[i].content = blogList[i].content.replace(/<img[\w\W]">/g,"");
            blogList[i].content = blogList[i].content.replace(/<[\w\w]*/g,"");
            blogList[i].content = blogList[i].content.substring(0,300);

        }
        response.writeHead(200);
        response.write(respUtil.writeResult('success','查询成功',blogList));
        response.end();

    }







}
function  queryByTagCount(request,response){
    var params = url.parse(request.url,true).query;
    tagDao.queryTag(params.tag, function (result) {
        tagBlogMappingDao.queryByTagCount(result[0].id, function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success','查询成功',result));
            response.end();

        })


    })





}
path.set('/queryByTagCount',queryByTagCount);
module.exports.path = path;



