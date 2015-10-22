/**
 * Created by AlexXie on 2015/10/22.
 */

"use strict";

var router = require("koa-router");
var route = new router({
    prefix: '/line'
});
var lineCtrl = require("./line.server.controller"),
    authCtrl = require("../auth/auth.server.controller");

route.all("*",authCtrl.isAuthenticated);

route.get("/", lineCtrl.lineIndex);
route.post("/post",lineCtrl.create);

module.exports = route;
