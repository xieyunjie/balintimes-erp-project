/**
 * Created by AlexXie on 2015/12/21.
 */

var util = require("../routes/util");
var jwt = require("koa-jwt"),
    setting = require("../../AppSetting");

var middleware = {};
middleware.ensureAuthorized = function*(next) {

    var req = this.request;
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];

        req.token = bearerToken;
    }
    yield next;
};

middleware.jwtError = function*(next) {
    try {
        yield next;
    } catch (err) {
        if (401 == err.status) {
            //this.status = 401;

            this.body = util.retFailture('401 Unauthorized - Protected resource, use Authorization header to get access', null);
        } else {
            throw err;
        }
    }
};

middleware.jwtVerify = function(){

    return jwt({secret:setting.jwt.secret,
                algorithm: setting.jwt.algorithm})

};

module.exports = middleware;
