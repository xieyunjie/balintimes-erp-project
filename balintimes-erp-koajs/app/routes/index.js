
var router = require("koa-router");
var route = new router({
  prefix:''
});

route.get("/",function *(next){
  yield  this.render('index', { title: 'Express' });
});

route.get("/about",function *(next){
  yield  this.render('about', { title: 'About',message:"这是一个about页面" });
});

module.exports = route;

