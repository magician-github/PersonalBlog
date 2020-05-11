var dbUtil = require('./DBUtil.js');
function insertBlog(title,content,views,tags,ctime,utime,success) {
    var insertSql = "insert into blog(title,content,views,tags,ctime,utime) values(?,?,?,?,?,?);";
    var params = [title,content,views,tags,ctime,utime];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(insertSql,params, function (error,result) {
        if(error == null) {
            success(result);
        }else {
            console.log(error);
        }

    });
    connection.end();
}
function queryBlogByPage(page,pageSize,success) {
    var insertSql = "select * from blog order by id desc limit ?,?;";
    var params = [page,pageSize];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(insertSql,params, function (error,result) {
        if(error == null) {
            success(result);
        }else {
            console.log(error);
        }

    });
    connection.end();
}
function queryBlogById(id,success) {
    var querySql = "select * from blog where id = ?;";
    var params = [id];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }

    });
    connection.end();
}
function  queryBlogCount(success){

    var insertSql = "select count(*) as count from blog;";
    var params = [];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(insertSql,params, function (error,result) {
        if(error == null) {
            success(result);
        }else {
            console.log(error);
        }

    });
    connection.end();

}
function queryAllBlog(success) {
    var querySql = "select * from blog;";
    var params = [];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }

    });
    connection.end();
}
function addViews(id,success) {
    var updateSql = "update blog set views = views + 1 where id = ?;";
    var params = [id];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(updateSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }

    });
    connection.end();
}
function queryHotTitleByViews(success) {
    var querySql = "select * from blog order by views desc limit 5;";
    var params = [];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }

    });
    connection.end();
}

module.exports.addViews = addViews;
module.exports.queryAllBlog = queryAllBlog;
module.exports.queryBlogCount = queryBlogCount;
module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogById = queryBlogById;
module.exports.queryHotTitleByViews = queryHotTitleByViews;