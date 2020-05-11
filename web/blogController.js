var path = new Map();
var blog = require('../dao/blogDao.js');
var tagDao = require('../dao/tagsDao.js');
var timeUtil = require('../util/TimeUtil.js');
var respUtil = require('../util/RespUtil.js');
var tagBlogMappingDao = require('../dao/tagBlogMapping.js');
var url = require('url');
function editBlog(request,response) {
    var params = url.parse(request.url,true).query;
    var tags = params.tags.replace(/ /g,'').replace('，',',');
    request.on('data', function (data) {
        blog.insertBlog(params.title,data.toString(),0,tags,timeUtil.getNow(),timeUtil.getNow(),function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success','添加文章成功',null));
            response.end();
            var blogId = result.insertId;
            var tagList = tags.split(",");
            for(var i = 0;i<tagList.length;i++) {
                if(tagList[i] == "") {
                    continue;
                }
                queryTag(tagList[i],blogId);
            }
        })

    })
};
path.set("/editBlog",editBlog);
function  queryBlogCount(request,responce){
    blog.queryBlogCount(function (result) {
        responce.writeHead(200);
        responce.write(respUtil.writeResult("success",'查询成功',result));
        responce.end();

    })

}
path.set('/queryBlogCount',queryBlogCount);
function queryBlogById(request,responce) {
    var params = url.parse(request.url,true).query;
    blog.queryBlogById(parseInt(params.bid), function (result) {
        blog.addViews(parseInt(params.bid), function (result) {

        });
        responce.writeHead(200);
        responce.write(respUtil.writeResult("success",'查询成功',result));
        responce.end();


    })


}
function queryHotTitleByViews(request,responce) {
    blog.queryHotTitleByViews(function (result){
        responce.writeHead(200);
        responce.write(respUtil.writeResult("success",'查询成功',result));
        responce.end();
    })

}
path.set('/queryHotTitleByViews',queryHotTitleByViews);
path.set('/queryBlogById',queryBlogById);
function queryBlogByPage(request,responce){
    var params = url.parse(request.url,true).query;
    blog.queryBlogByPage(parseInt(params.page),parseInt(params.pageSize), function (result) {
        for(var i = 0 ;i< result.length;i++){
            result[i].content = result[i].content.replace(/<img[\w\W]">/g,"");
            result[i].content = result[i].content.replace(/<[\w\w]*/g,"");
            result[i].content = result[i].content.substring(0,300);

        }
        responce.writeHead(200);
        responce.write(respUtil.writeResult("success",'查询成功',result));
        responce.end();

    });

}
path.set('/queryBlogByPage',queryBlogByPage)
function queryTag(tag,blogId) {
tagDao.queryTag(tag, function (result) {
    if(result == null || result.length == 0) {
        insertTag(tag,blogId);
    }else {
        insertTagBlogMapping(result[0].id,blogId);
    }

})



}
function insertTag(tag,blogId) {
    tagDao.insertTag(tag,timeUtil.getNow(),timeUtil.getNow(), function (result) {
        ;
        tagBlogMappingDao.insertTagBlogMapping(result.insertId,blogId,timeUtil.getNow(),timeUtil.getNow(), function (result) {
            
        });


    })


}
function  insertTagBlogMapping(tagId,blogId){
    tagBlogMappingDao.insertTagBlogMapping(tagId,blogId,timeUtil.getNow(),timeUtil.getNow(), function (result) {

        
    })
    
}
function queryAllBlog(request,responce) {
    blog.queryAllBlog(function (result) {
        responce.writeHead(200);
        responce.write(respUtil.writeResult("success",'查询成功',result));
        responce.end();
    })

}
path.set('/queryAllBlog',queryAllBlog)
//function queryBlog(request,response) {
//    everyDay.queryEveryDay(function (result) {
//        response.writeHead(200);
//        response.write(respUtil.writeResult('success','查询成功',result));
//        response.end();
//
//
//    })
//}
path.set('/editBlog',editBlog);
//path.set('/queryBlog',queryBlog);
module.exports.path = path;