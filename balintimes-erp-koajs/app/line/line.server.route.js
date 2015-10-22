/**
 * Created by AlexXie on 2015/10/22.
 */
var router = require("koa-router");
var route = new router({
    prefix: '/line'
});
var lineCtrl = require("./line.server.controller");

route.get("/", lineCtrl.lineIndex);

module.exports = route;
