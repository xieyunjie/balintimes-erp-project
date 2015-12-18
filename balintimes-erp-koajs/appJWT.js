var koa = require("koa"),
    bodyParse = require("koa-body"),
    render = require("koa-ejs"),
    path = require('path'),
    serve = require('koa-static'),
    logger = require("koa-logger"),
    session = require('koa-generic-session');

var router = require("koa-router");
var jwt = require("koa-jwt");

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

var jwtSecret = "secret";

var route = new router({
    prefix: '/jwt'
});

route.get("/", function*() {
    yield this.render("jwt");
});
route.post("/sign", function *() {
    var ctx = this;
    var username = ctx.request.body.username, psw = ctx.request.body.password;

    if (username != psw) {
        this.body = "error";
    }
    else {
        var result = {
            name: username,
            password: psw,
            redisToken: "78&*45$%"
        };
        //jwt.sign(payload, secretOrPrivateKey, options, [callback])
        //options --> //	algorithm (default: HS256)
        //	expiresIn: expressed in seconds or an string describing a time span rauchg/ms. Eg: 60, "2 days", "10h", "7d"
        //	audience
        //	subject
        //	issuer
        //	noTimestamp
        //	headers

        var token = jwt.sign(result, jwtSecret);
        result.token = token;
        console.info(token);

        this.body = result;
    }

});
app.use(route.routes());

// 以上的中间件不会被验证

app.use(function *(next) {
    try {
        yield next;
    } catch (err) {
        if (401 == err.status) {
            //this.status = 401;
            this.body = '401 Unauthorized - Protected resource, use Authorization header to get access\n';
        } else {
            throw err;
        }
    }
});
// 验证是否合法？
app.use(jwt({ secret: jwtSecret }));

var route2 = new router({
    prefix: '/jwt'
});
route2.get("/load", function *() {
    var ctx = this;

    this.body ="success";
});
app.use(route2.routes());


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