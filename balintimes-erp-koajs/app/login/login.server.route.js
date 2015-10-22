/**
 * Created by AlexXie on 2015/10/22.
 */


var router = require("koa-router"),
passport = require('koa-passport');

var route = new router({
    prefix: ''
});

route.get("/login", function *() {
    yield this.render("login");
});

route.post("/login", passport.authenticate('local', {
    successRedirect: '/line',
    failureRedirect: '/login',
    failureFlash: true
}));

route.all("/logout", function *() {
    this.logout();
    this.redirect('/');
});

module.exports = route;