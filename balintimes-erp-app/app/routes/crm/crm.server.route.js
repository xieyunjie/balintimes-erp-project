/**
 * Created by AlexXie on 2015/11/30.
 */

var router = require("koa-router");
var koaBody = require("koa-body")({multipart:true});
    //multer = require("koa-multer");

var route = new router({
    prefix: '/crm'
});
//const upload = multer({dest:'uploads/'})

//route.post("/profile", upload.single('avatar'))
route.post("/profile",koaBody, function*(){
    console.log(this.request.body.files);
    this.body = "success";
});
route.get('/province', function*() {
    var result = {
        success:true,
        message:'这个一个提示呵呵',
        code:200,
        page:1,
        pagesize:50,
        total:100,
        data:province
    };

    this.body = result;
    console.log("province");
});

route.post("/saveprovince",function*(){

    var ctx = this;
    console.log(this.request.body);

    this.body = "success";

});

var province = [{
    id:'1',
    name:'广东省',
    createtime:'2015-01-01'
},{
    id:'2',
    name:'福建省',
    createtime:'2015-01-01'
},{
    id:'3',
    name:'广西省',
    createtime:'2015-01-01'
}];

var customer = [{
    name:"可口可乐",
    count:10,
    createtime:"2015-01-01 5:00:00"
},{
    name:"百事可乐",
    count:99,
    createtime:"2015-09-01 9:00:00"
}];

route.get("/customer", function *(){
    setTimeout(function() {this.body = customer;console.log("1111");}, 1000*2);
// this.body = customer;
});

route.post("/customer",function *(next){

    console.dir(this.request.query);
    var p = this.request.body;
    console.dir(p);

    this.body = customer;

});

module.exports = route;