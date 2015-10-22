var koa = require("koa"),
    bodyParse = require("koa-body"),
    render = require("koa-ejs"),
    path = require('path'),
    serve = require('koa-static'),
    logger = require("koa-logger");
var app = koa();

app.use(logger());
app.use(bodyParse());
app.use(serve(path.join(__dirname, './static')));

render(app, {
    root: path.join(__dirname, './app/views'),
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: true
});

var homeroute = require("./app/routes/index");

app.use(homeroute.routes());

//app.use(route.all("/",homeroute));

//app.use(route.get("/",indexView));
//function *indexView(next){
//    yield  this.render('index', { title: 'Express' });
//}


module.exports = app;