var dbUtil = require('./DBUtil.js');
function insertComment(blogId,name,email,content,ctime,utime,parent,parent_name,success) {
    console.log(parent_name)
    var insertSql = "insert into comments(blog_id,user_name,parent,parent_name,email,comments,ctime,utime) values(?,?,?,?,?,?,?,?);";
    var params = [blogId,name,parent,parent_name,email,content,ctime,utime];
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
function queryBlogCommentsById(bid,success) {
    var querySql = "select * from comments where blog_id = ?;";
    var params = [bid];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql,params, function (error,result) {
        if(error == null) {
            success(result);
        }else {
            console.log(error);
        }

    });
    connection.end();
}
function queryBlogCommentsCountById(bid,success) {
    var querySql = "select count(1) as count from comments where blog_id = ?;";
    var params = [bid];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql,params, function (error,result) {
        if(error == null) {
            success(result);
        }else {
            console.log(error);
        }

    });
    connection.end();
}
function queryRecentCommen(success) {
    var querySql = "select *  from comments order by comments limit 5;";
    var params = [];
    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql,params, function (error,result) {
        if(error == null) {
            success(result);
        }else {
            console.log(error);
        }

    });
    connection.end();
}
module.exports.queryRecentCommen = queryRecentCommen;
module.exports.insertComment = insertComment;
module.exports.queryBlogCommentsById = queryBlogCommentsById;
module.exports.queryBlogCommentsCountById =  queryBlogCommentsCountById;