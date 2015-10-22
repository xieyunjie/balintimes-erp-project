/**
 * Created by AlexXie on 2015/10/22.
 */

var AuthController = {};

AuthController.isAuthenticated = function *(next){
    if(this.isAuthenticated()){
        yield next;
    }
    else
    {
        this.redirect('/login');
    }
};

module.exports = AuthController;