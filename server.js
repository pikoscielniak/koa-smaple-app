var koa = require('koa');
var router = require('koa-router')();
var serve = require('koa-static');
var passport = require('koa-passport');
var jwt = require('koa-jwt');
var moment = require('moment');
var project = require('./lib/project');

var localStrategy = require('./lib/auth/localStrategy');

var _ = require('lodash');

var db = require('./lib/db');

var app = koa();
module.exports = app;

app.use(passport.initialize());

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
passport.use('local-register', localStrategy.registerStrategy);
passport.use('local-login', localStrategy.loginStrategy);

function * authHandler() {
    debugger;
    var payload = {
        iss: this.hostname,
        sub: this.request.user._id,
        exp: moment().add(10, 'days').unix()
    };

    var token = jwt.encode(payload, 'tempquickkey');

    this.body = {
        user: this.request.user,
        token: token
    };
}
router.post('/register', passport.authenticate('local-register'), authHandler)
router.post('/login', passport.authenticate('local-login'), authHandler)

app.use(serve(__dirname + '/public'));

router.get('/api/project', project.getAll);
router.get('/api/project/:id', project.getById);
router.post('/api/project', project.post);

app.use(router.routes())
app.use(router.allowedMethods());

app.listen(3000);
console.log("Working...");