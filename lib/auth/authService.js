var users = require('../db').users;
var parse = require('co-body');
var moment = require('moment');

var tokenService = require('./jwtTokenService');

function getToken(ctx, user) {
    var payload = {
        iss: ctx.hostname,
        sub: user._id.toString(),
        exp: moment().add(tokenService.TOKEN_EXPIRATION_DAYS, 'days').unix()
    };

    var token = tokenService.encodeJwtToken(payload);

    return {
        user: {
            email: user.email,
            id: user._id
        },
        token: token
    };
}

var passwordService = require('./passwordService');

module.exports.login = function *() {
    var params = yield parse(this);
    var email = params.email;
    var password = params.password;

    var searchUser = {email: email};
    var user = yield users.findOne(searchUser);
    if (!user) {
        this.body = {message: 'Email or password incorrect'};
        this.status = 400;
        return;
    }

    var match = yield passwordService.compare(password, user.password);
    if (match) {
        this.body = getToken(this, user);
        return;
    }
    this.body = {message: 'Email or password incorrect'};
    this.status = 400;
};

module.exports.register = function * () {
    var params = yield parse(this);
    var email = params.email;
    var password = params.password;

    var searchUser = {email: email};
    var user = yield users.findOne(searchUser);
    if (user) {
        this.body = {message: 'Email already exists'};
        this.status = 400;
        return;
    }
    var hashedPassword = yield passwordService.hash(password);
    var user = yield users.insert({email: email, password: hashedPassword});
    this.body = getToken(this, user);
};