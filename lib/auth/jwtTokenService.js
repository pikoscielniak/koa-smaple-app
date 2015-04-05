var jwt = require('jwt-simple');

var secret = "tempsecret"; //TODO add config for this
exports.TOKEN_EXPIRATION_DAYS = 10;

module.exports.encodeJwtToken = function (payload) {
    return jwt.encode(payload, secret);
};

module.exports.decodeJwtToken = function (payload) {
    return jwt.decode(payload, secret);
};