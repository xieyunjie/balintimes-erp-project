/**
 * Created by AlexXie on 2015/12/30.
 */

var router = require("koa-router");
var path = require('path');
var route = new router({
    prefix: '/resources'
});

route.get("/introduce",function*(){

    var url  =  path.join(__dirname, '/../../../public/vedio/introduce.mp4');
    console.log(url);
this.body = this.response.attachment(url);
});

module.exports = route;
