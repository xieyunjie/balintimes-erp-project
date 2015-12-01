var koa = require("koa"),
    bodyParse = require("koa-body"),
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

var crmroute = require("./app/routes/crm/crm.server.route");

app.use(crmroute.routes());

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