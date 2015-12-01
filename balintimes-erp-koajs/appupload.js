/**
 * Created by AlexXie on 2015/12/1.
 */
var app = require('koa')(),
    router = require('koa-router')(),
    koaBody = require('koa-body'),
    path = require('path'),
    render = require("koa-ejs");

render(app, {
    root: path.join(__dirname, './app/views'),
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: true
});

router.get('/crm/index',function*(){
    var ctx = this;
    yield ctx.render("crm");
});

router.post('/crm/profile', koaBody({multipart: true,
        formidable: {
            uploadDir: __dirname + '/uploads',
            keepExtensions:true,
            encoding:"utf-8"
        }}),
    function *(next) {
        console.log(this.request.body.fields);
        this.body = JSON.stringify(this.request.body, null, 2)
        yield next;
    }
);

app.use(router.routes());

var port = process.env.PORT || 3333;
app.listen(port);