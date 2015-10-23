'use strict';


function lazyPrint(title,name,callback) {
    setTimeout(function() {
        console.log("title is " + title);
        callback(null, "return " + title + name);
    }, 2 * 1000);
}


// lazyPrint("my title", function(err, data) {
//     console.log(data);
// });

var thunkify = require('thunkify');
var co = require("co");
var lazyPrintThunk = thunkify(lazyPrint);

var gen = function*(){

	var r1 = yield lazyPrintThunk('qq title','myname');
	console.log(r1);
};

co(gen);
