/**
 * Created by AlexXie on 2015/10/22.
 */
"use strict";
var uuid = require('node-uuid');
var koaMongoose = require("koa-mongoose");
var mongoose = koaMongoose.mongoose;
var Line = mongoose.model("Line", require("../../schemas/Line"));

var LineController = {};

LineController.lineIndex = function *(next) {
    var ctx = this;
    var lines = yield Line.findQ();
    yield ctx.render("line", {title: 'this is line title', lines: lines});
};

LineController.create = function *() {
    console.log("create create create");
    this.body = {success: true};
};

LineController.edit = function *(next) {
    var uid = this.params.uid;
    var line;
    if (uid == "0") {
        line = {uid: 0, name: '', cityname: '', openingtime: ''}
    } else {
        line = yield Line.findOneQ({uid: uid});
    }

    yield this.render("lineedit", {line: line});
};

LineController.save = function*() {
    var body = this.request.body;
    if (body.uid == "0") {
        body.uid = uuid.v4();

        var line = new Line(body);

        yield line.saveQ();
    }else{
        //var line = new Line(body);
        yield Line.updateQ({uid: body.uid},body,{});
    }

    this.redirect("/line");
};

LineController.delete = function*(){
    var uid = this.params.uid;
    yield Line.findOneAndRemoveQ({uid:uid});
    this.redirect("/line");
};
LineController.show = function*(){
    console.log(this.query);
};


module.exports = LineController;