var LocalStrategy = require('passport-local').Strategy;
var users = require('../db').users;
var co = require('co');

var passwordService = require('./passwordService');

var strategyOptions = {
    usernameField: 'email'
};

module.exports.loginStrategy = new LocalStrategy(strategyOptions, function (email, password, done) {

    co(function *() {
        var searchUser = {email: email};
        var user = yield users.findOne(searchUser);
        if (!user) throw new Error('Email or password incorrect');

        var match = yield passwordService.compare(password, user.password);
        if (match) return user;

        throw new Error('Email or password incorrect')
    }).then(done, done);
});

module.exports.registerStrategy = new LocalStrategy(strategyOptions, function (email, password, done) {
    co(function * () {
        var searchUser = {email: email};

        var user = yield users.findOne(searchUser);
        if (user) throw new Error('Email already exists');
        var hashedPassword = passwordService.hash(password);
        var savedUser = yield users.insert({email: email, password: hashedPassword});
        return savedUser;
    }).then(done, done);
});