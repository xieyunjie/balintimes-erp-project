/**
 * Created by AlexXie on 2015/11/30.
 */

var router = require("koa-router");
var koaBody = require("koa-body");
var wait = require("co-wait");
var crmCtrl = require("./crm.server.controller");

var route = new router({
    prefix: '/crm'
});

route.post("/sign",crmCtrl.sign);
route.post("/register",crmCtrl.register);

route.post("att", koaBody({
    multipart: true,
    formidable: {
        uploadDir: 'uploads',
        keepExtensions: true,
        encoding: "utf-8",
        maxFieldsSize: "2048"
    }
}),crmCtrl.uploadatt);


route.post('/profile', koaBody({
        multipart: true,
        formidable: {
            uploadDir: 'uploads',
            keepExtensions: true,
            encoding: "utf-8",
            maxFieldsSize: "2048"
        }
    }),
    function *(next) {
        console.log(this.request.body.fields);
        var result = {
            success: true,
            message: '这个一个提示呵呵',
            code: 200,
            page: 1,
            pagesize: 50,
            total: 100,
            data: ""
        };


        this.body = result;
        console.log(JSON.stringify(this.request.body, null, 2));
        //yield next;
    }
);

route.get('/province', function*() {

    yield wait(2*1000);

    var result = {
        success: true,
        message: '这个一个提示呵呵',
        code: 200,
        page: 1,
        pagesize: 50,
        total: 100,
        data: province
    };

    this.body = result;
    console.log("province");
});

route.get('/cities/:id', function*() {
    yield wait(2*1000);

    for (var i = 0; i < cities.length; i++) {
        if (cities[i].provinceid == this.params.id) {
            var result = {
                success: true,
                message: '这个一个提示呵呵',
                code: 200,
                page: 1,
                pagesize: 50,
                total: 100,
                data: cities[i].cities
            }
            this.body  = result;
            break;
        }
    }
});

route.post("/saveprovince", function*() {

    var ctx = this;
    console.log(this.request.body);

    this.body = "success";

});

var province = [{
    id: '1',
    name: '广东省',
    createtime: '2015-01-01'
}, {
    id: '2',
    name: '福建省',
    createtime: '2015-01-01'
}, {
    id: '3',
    name: '广西省',
    createtime: '2015-01-01'
}];

var customer = [{
    name: "可口可乐",
    count: 10,
    createtime: "2015-01-01 5:00:00"
}, {
    name: "百事可乐",
    count: 99,
    createtime: "2015-09-01 9:00:00"
}];

var cities = [{
    provinceid: '1',
    cities: [{
        id: '1',
        name: '广州市',
        createtime: '2015-01-02'
    }, {
        id: '2',
        name: '深圳市',
        createtime: '2015-01-02'
    }, {
        id: '3',
        name: '东莞市',
        createtime: '2015-01-02'
    }, {
        id: '34',
        name: '中山',
        createtime: '2015-01-02'
    }]
}, {
    provinceid: '2',
    cities: [{
        id: '4',
        name: '福州市',
        createtime: '2015-01-02'
    }, {
        id: '5',
        name: 'A市',
        createtime: '2015-01-02'
    }, {
        id: '6',
        name: 'B市',
        createtime: '2015-01-02'
    }, {
        id: '34',
        name: 'B中山',
        createtime: '2015-01-02'
    }]
}, {
    provinceid: '3',
    cities: [{
        id: '10',
        name: '桂林市',
        createtime: '2015-01-02'
    }, {
        id: '11',
        name: '阳朔市',
        createtime: '2015-01-02'
    }, {
        id: '12',
        name: 'C东莞市',
        createtime: '2015-01-02'
    }, {
        id: '13',
        name: 'E中山',
        createtime: '2015-01-02'
    }, {
        id: '14',
        name: 'W中山',
        createtime: '2015-01-02'
    }]
}]

route.get("/customer", function *() {
    setTimeout(function () {
        this.body = customer;
        console.log("1111");
    }, 1000 * 2);
// this.body = customer;
});

route.post("/customer", function *(next) {

    console.dir(this.request.query);
    var p = this.request.body;
    console.dir(p);

    this.body = customer;

});

module.exports = route;