/**
 * Created by AlexXie on 2015/10/22.
 */

var LineController = {};

LineController.lineIndex = function *(next){
    var ctx = this;

    yield ctx.render("line",{title:'this is line title'});
};

module.exports = LineController;