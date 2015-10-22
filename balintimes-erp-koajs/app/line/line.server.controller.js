/**
 * Created by AlexXie on 2015/10/22.
 */

"use strict";
var LineController = {};

LineController.lineIndex = function *(next) {
    var ctx = this;
    yield ctx.render("line", {title: 'this is line title'});
};

LineController.create = function *() {
    console.log("create create create");
    this.body = {success: true};
};

module.exports = LineController;