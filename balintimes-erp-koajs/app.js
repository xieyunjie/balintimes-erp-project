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

var homeroute = require("./app/routes/index"),
lineroute = require("./app/line/line.server.route");

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


//app.use(route.all("/",homeroute));

//app.use(route.get("/",indexView));
//function *indexView(next){
//    yield  this.render('index', { title: 'Express' });
//}


module.exports = app;