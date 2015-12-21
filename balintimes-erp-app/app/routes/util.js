/**
 * Created by AlexXie on 2015/12/8.
 */


var util = {};

util.retSuccess = function (message,data){

    return  {
        success: true,
        message:  message == null ? '操作成功' : message,
        code: 200,
        page: 0,
        pagesize: 0,
        total: 0,
        data: data
    };
};
util.retFailture = function (message, data) {
    return {
        success: false,
        message:  message == null ? '操作成功' : message,
        code: 200,
        page: 0,
        pagesize: 0,
        total: 0,
        data: data
    };
}

module.exports = util;