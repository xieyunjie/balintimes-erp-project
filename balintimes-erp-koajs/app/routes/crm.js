/**
 * Created by AlexXie on 2015/11/11.
 */
var router = require("koa-router");
var koaBody = require('koa-body');

//var timeout = require('koa-timeout')(500);

var route = new router({
    prefix: '/crm'
});

route.get('/index',function*(){
    var ctx = this;
    yield ctx.render("crm");
});

route.post('/profile', koaBody({multipart: true,
        formidable: {
            uploadDir: 'uploads',
            keepExtensions:true,
            encoding:"utf-8",
            maxFieldsSize:"20480"
        }}),
    function *(next) {
        console.log(this.request.body.fields);
        this.body = JSON.stringify(this.request.body, null, 2)
        yield next;
    }
);

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

    console.dir(this.req.headers["content-type"]);

    this.body = customer;console.log("1111");

//setTimeout(function() {this.body = customer;console.log("1111");}, 1000*2);
// this.body = customer;
});

route.post("/customer",function *(next){

    console.dir(this.request.query);
    var p = this.request.body;
    console.dir(p);

    this.body = customer;

});

module.exports = route;