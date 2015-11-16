'use strict';

function lazyPrint(title,name,callback) {

    setTimeout(function() {
        console.log("title is " + title);
        var err = 1;
        callback(err, "return " + title + name, "123");
    }, 2 * 1000);
}

var thunkify = require('thunkify');
var co = require("co");
var lazyPrintThunk = thunkify(lazyPrint);

var gen = function*(){

    try {
        var r1 = yield lazyPrintThunk('qq title', 'myname');
        console.log("r1 == begin ==");
        console.log(r1);
    } catch(e){
        console.log(e);
    }



};

co(gen);


