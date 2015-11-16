/**
 * Created by AlexXie on 2015/11/11.
 */
var router = require("koa-router");

var route = new router({
    prefix: '/crm'
});

var customer = [{
    name:"可口可乐",
    count:10,
    createtime:"2015-01-01 5:00:00"
},{
    name:"百事可乐",
    count:99,
    createtime:"2015-09-01 9:00:00"
}];

route.get("/customer", function *(){

    this.body = customer;

});

module.exports = route;