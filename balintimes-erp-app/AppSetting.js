/**
 * Created by AlexXie on 2015/12/21.
 */


var setting = {
    jwt: {
        "issuer":"balintimes-issuer",
        "secret": "secret",
        "algorithm": "HS256",
        "expiresInMinutes":1 // 注意是分钟
    }
};

module.exports = setting;