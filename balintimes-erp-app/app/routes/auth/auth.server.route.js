/**
 * Created by AlexXie on 2015/12/21.
 */

var router = require("koa-router"),
    setting = require("../../../AppSetting"),
    util = require("../util"),
    jwt = require("koa-jwt");

var route = new router({
    prefix: '/auth'
});

route.all("*",function*(next){

    console.log("auth all");
    yield  next;

});

route.post("/signin", function *() {

    var ctx = this;
    var username = ctx.request.body.username, psw = ctx.request.body.password;

    if (username != psw) {
        this.body = util.retFailture("登录失败", null);
    }
    else {
        var result = {
            uid:"123456789",
            name: username,
            password: psw,
            redisToken: "78&*45$%"
        };

        //jwt.sign(payload, secretOrPrivateKey, options, [callback])
        //options --> //	algorithm (default: HS256)
        //	expiresIn: expressed in seconds or an string describing a time span rauchg/ms. Eg: 60, "2 days", "10h", "7d"
        //	audience
        //	subject
        //	issuer
        //	noTimestamp
        //	headers

        var token = jwt.sign(result, setting.jwt.secret, {
            expiresInMinutes: setting.jwt.expiresInMinutes,
            algorithm: setting.jwt.algorithm
        });
        result.token = token;
        console.info(token);

        this.body = util.retSuccess(null,result);
    }
});

route.get("/verify",function*(){

    this.body = util.retSuccess("",null);

});

route.get("/signout", function *() {

    this.body = util.retSuccess("退出成功。",null);

});

module.exports = route;