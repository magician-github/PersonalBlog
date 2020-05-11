var path = new Map();
var everyDay = require('../dao/everyDayDao.js');
var timeUtil = require('../util/TimeUtil.js');
var respUtil = require('../util/RespUtil.js');
function editEveryDay(request,response) {
    request.on('data', function (data) {
        everyDay.insertEveryDay(data.toString(),timeUtil.getNow(),function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success','添加成功',null));
            response.end();


        })

    })
};
function queryEveryDay(request,response) {
    everyDay.queryEveryDay(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success','查询成功',result));
        response.end();


    })
}
path.set('/editEveryDay',editEveryDay);
path.set('/queryEveryDay',queryEveryDay);
module.exports.path = path;