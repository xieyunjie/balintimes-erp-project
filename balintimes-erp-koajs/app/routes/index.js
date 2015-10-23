var router = require("koa-router"),
    koaMongoose = require("koa-mongoose");
var mongoose = koaMongoose.mongoose;
var Line = mongoose.model("Line", require("../../schemas/Line"));


var route = new router({
    prefix: ''
});

route.get("/", function *(next) {
    yield  this.render('index', {title: 'Express'});
});

route.get("/about", function *(next) {
    yield  this.render('about', {title: 'About', message: "这是一个about页面"});
});

route.get("/info", function *(next) {

    //var Line = mongoose.model("Line",userSchema);

    //var Line = this.model('Line');

    var docs = yield Line.findQ();

    this.body = docs;
});


module.exports = route;

