var LocalStrategy = require('passport-local').Strategy;
var users = require('../db').users;
var co = require('co');

var strategyOptions = {
    usernameField: 'email'
};

module.exports.loginStrategy = new LocalStrategy(strategyOptions, function (email, password, done) {

    co(function *() {
        var searchUser = {email: email};
        try {
            var user = users.findOne(searchUser);
            if(!user) return null;
        } catch (ex) {
            return null;
        }
    }).then(done, done);


    users.findOne(searchUser, function (err, user) {
        if (err) return done(err);

        if (!user) {
            return done(null, false, {message: 'Wrong email/password'});
        }

        user.comparePassword(password, function (err, isMath) {
            if (err) return done(err);

            if (!isMath) {
                return done(null, false, {message: 'Wrong email/password'});
            }
            return done(null, user);
        });
    });
});


module.exports.registerStrategy = new LocalStrategy(strategyOptions, function (email, password, done) {
    var searchUser = {email: email};

    User.findOne(searchUser, function (err, user) {
        if (err) return done(err);

        if (user) {
            return done(null, false, {message: 'email already exists'});
        }

        var newUser = new User({
            email: email,
            password: password
        });


        newUser.save(function (err) {
            if (err) {
                done(err);
                return;
            }
            done(null, newUser);
        });
    });
});