/**
 * Created by AlexXie on 2015/12/7.
 */

var util = require("../util"),
    wait = require("co-wait");

var signCustomerController = {};

signCustomerController.sign = function *(){
    var ctx = this;

    console.dir(ctx.request.body);

    yield wait(1.5*1000);

    ctx.body = util.retSuccess();
};

signCustomerController.register = function *(){
    var ctx = this;

    console.dir(ctx.request.body);

    yield wait(1.5*1000);

    ctx.body = util.retSuccess();
};

signCustomerController.uploadatt = function *(){

    console.log(this.request.body.fields);
    console.log(JSON.stringify(this.request.body, null, 2));
    var result = util.retSuccess();
    result.message = "上传成功";
    this.body = result;
};

module.exports = signCustomerController;



