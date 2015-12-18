var koa = require("koa"),
bodyParse = require("koa-body"),
render = require("koa-ejs"),
path = require('path'),
serve = require('koa-static'),
logger = require("koa-logger"),
session = require('koa-generic-session');

var router = require("koa-router");

var app = koa();

app.use(session());

app.use(logger());
app.use(bodyParse());
app.use(serve(path.join(__dirname, './static')));



render(app, {
    root: path.join(__dirname, './app/views'),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: true
});

var route = new router({
    prefix: ''
});

route.get("/jwt",function*(){
    yield this.render("jwt");
});

app.use(route.routes());




app.use(function *pageNotFound(next) {
    yield next;

    if (404 != this.status) return;
    this.status = 404;

    switch (this.accepts('html', 'json')) {
        case 'html':
            this.type = 'html';
            this.body = '<p>Page Not Found</p>';
            break;
        case 'json':
            this.body = {
                message: 'Page Not Found'
            };
            break;
        default:
            this.type = 'text';
            this.body = 'Page Not Found';
    }
});

module.exports = app;