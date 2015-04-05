var tokenService = require('./jwtTokenService');
var moment = require('moment');

function tokenExpired(token) {
    var now = moment().unix();
    return now >= token.exp;
}
module.exports = function * (next) {
    var token = getToken(this.request.headers);
    if (token) {
        debugger;
        var decodedToken = tokenService.decodeJwtToken(token);
        if (tokenExpired(decodedToken)) {
            this.status = 401;
            this.body = {message: 'Not authorized'};
            return;
        }
        yield next;
        return;
    }
    this.status = 401;
    this.body = {message: 'Not authorized'}
};

function getToken(headers) {
    if (headers && headers.authorization) {
        var part = headers.authorization.split(' ');
        if (part.length == 2) {
            return part[1];
        }
    }
    return null;
}