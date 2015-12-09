/**
 * Created by AlexXie on 2015/12/8.
 */


var util = {};

util.retSuccess = function (){

    return  {
        success: true,
        message: '操作成功',
        code: 200,
        page: 0,
        pagesize: 0,
        total: 0,
        data: null
    };
};
util.retFailture = function () {
    return {
        success: false,
        message: '操作失败',
        code: 200,
        page: 0,
        pagesize: 0,
        total: 0,
        data: null
    };
}

module.exports = util;