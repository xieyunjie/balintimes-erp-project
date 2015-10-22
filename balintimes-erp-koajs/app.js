var koa = require("koa"),
bodyParse = require("koa-body"),
render = require("koa-ejs"),
path = require('path'),
serve = require('koa-static'),
session = require('koa-generic-session'),
logger = require("koa-logger");
var app = koa();

app.keys = ['balintimes-session-secret'];
app.use(session());

app.use(logger());
app.use(bodyParse());
app.use(serve(path.join(__dirname, './static')));

require('./app/auth/auth');
var passport = require('koa-passport');
app.use(passport.initialize());
app.use(passport.session());


render(app, {
    root: path.join(__dirname, './app/views'),
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: true
});

var homeroute = require("./app/routes/index"),
loginroute = require("./app/login/login.server.route"),
lineroute = require("./app/line/line.server.route");

app.use(loginroute.routes());
app.use(homeroute.routes());
app.use(lineroute.routes());

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