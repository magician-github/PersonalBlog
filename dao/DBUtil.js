var mysql = require('mysql');
function  createConnection() {
    var connection = mysql.createConnection({
        host:'localhost',
        port:'3306',
        user:'root',
        database:'my_blog',
        password:'chenDuyi0711'
    });
    return connection;
}
module.exports.createConnection = createConnection;