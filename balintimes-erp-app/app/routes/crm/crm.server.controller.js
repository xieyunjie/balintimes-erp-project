/**
 * Created by AlexXie on 2015/12/7.
 */

var util = require("../util"),
    wait = require("co-wait");
var faker = require("faker/locale/zh_CN");

var signCustomerController = {};

signCustomerController.list = function*() {
    var page = this.request.body.page,
        pagesize = this.request.body.pagesize,
        totalcount = 55;

    var list = [];
    for (var i = (page-1) * pagesize; i < page * pagesize && i < totalcount; i++) {
        var cus = {
            id:faker.random.uuid(),
            name:faker.company.companyName(),
            industry:faker.company.bsBuzz(),
            province:faker.address.state(),
            city:faker.address.city(),
            address:faker.address.streetAddress(),
            phonenumber:faker.address.streetAddress(),
            zipcode:faker.address.zipCode(),
            comment:faker.name.jobDescriptor(),
            brandname:faker.company.companyName(),
            status:faker.random.boolean(),
            signdate:faker.date.past()
        };
        list.push(cus);
    }
    var ret = util.retSuccess("",list);
    ret.page = 1;
    ret.pagesize = 20;
    ret.total  = totalcount;
    this.body = ret;
};

signCustomerController.mediaType = function*(){
    var medialist = [];
    for(var i = 0;i<5;i++){
        medialist.push({
            uid:faker.random.uuid(),
            medianame:faker.commerce.department(),
            isspecial:faker.random.boolean()
        })
    }

    var typeList = [];
    for(var i = 0;i<5;i++){
        typeList.push({
            uid:faker.random.uuid(),
            cityname:faker.address.city(),
            comment:faker.name.jobDescriptor(),
            mediatypelist:medialist
        })
    }

    this.body = util.retSuccess("",typeList);

};

signCustomerController.sign = function *() {
    var ctx = this;

    console.dir(ctx.request.body);

    yield wait(1.5 * 1000);

    ctx.body = util.retSuccess();
};

signCustomerController.register = function *() {
    var ctx = this;

    console.dir(ctx.request.body);

    yield wait(1.5 * 1000);

    ctx.body = util.retSuccess();
};

signCustomerController.uploadatt = function *() {

    console.log(this.request.body.fields);
    console.log(JSON.stringify(this.request.body, null, 2));
    var result = util.retSuccess();
    result.message = "上传成功";
    this.body = result;
};

module.exports = signCustomerController;



