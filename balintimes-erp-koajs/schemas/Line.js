/**
 * Created by AlexXie on 2015/10/22.
 */

var mongoose = require("koa-mongoose").mongoose;

module.exports = new mongoose.Schema({
    uid: {
        type: String,
        unique: true
    },
    name: String,
    cityname: String,
    openingtime: Date
});