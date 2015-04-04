var jwt = require('jwt-simple');

//var redisClient = require('./../config/redisDatabase').redisClient;

var TOKEN_EXPIRATION = 60;
var TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION * 60;

// Middleware for token verification
exports.verifyToken = function (req, res, next) {
    var token = getToken(req.headers);

    redisClient.get(token, function (err, reply) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (!reply) {
            res.sendStatus(401);
        }
        else {
            next();
        }
    });
};

exports.setToken = function (token) {
    redisClient.set(token, "ok");
    redisClient.expire(token, TOKEN_EXPIRATION_SEC);
};

exports.expireToken = function (headers) {
    var token = getToken(headers);

    if (token != null) {
        redisClient.del(token);
    }
};

var getToken = function (headers) {
    if (headers && headers.authorization) {
        var authorization = headers.authorization;
        var part = authorization.split(' ');

        if (part.length == 2) {
            return part[1];
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
};

var secret = "tempsecret";

exports.TOKEN_EXPIRATION = TOKEN_EXPIRATION;
exports.TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION_SEC;

module.exports.encodeJwtToken = function (payload) {
    return jwt.encode(payload, secret);
};

module.exports.decodeJwtToken = function (payload) {
    return jwt.decode(payload, secret);
};