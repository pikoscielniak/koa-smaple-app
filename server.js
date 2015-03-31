var koa = require('koa');
var route = require('koa-route');
var serve = require('koa-static');
var parse = require('co-body');
var passport = require('koa-passport');
var jwt = require('koa-jwt');
var moment = require('moment');

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
    var payload = {
        iss: this.hostname,
        sub: this.request.user._id,
        exp: moment().add(10, 'days').unix()
    };

    var token = jwt.encode(payload, 'tempquickkey');

    this.body = {
        user: user.toJSON(),
        token: token
    };
}

app.use(route.post('/register', passport.authenticate('local-register'), authHandler));
app.use(route.post('/login', passport.authenticate('local-login'), authHandler));

app.use(serve(__dirname + '/public'));

function * getProjects() {
    var projects = yield db.projects.find({});
    var votes = yield db.votes.find({});
    _.each(projects, function (project) {
        project.votes = _.chain(votes).filter(function (vote) {
            return vote.projectId.toString() === project._id.toString()
        }).size().value();
    });
    return projects;
}

app.use(route.get('/api/project', function * () {
    this.body = yield getProjects();
}));

app.use(route.get('/api/project/:id', function * (id) {
    this.body = yield db.projects.findById(id);
}));

app.use(route.post('/api/project', function * () {
    var postedProject = yield parse(this);

    var existingProject = yield db.projects.find({$or: [{name: postedProject.name}, {url: postedProject.url}]});
    if (existingProject && existingProject.length > 0) {
        this.body = {message: 'Project exists'};
        this.status = 400;
        return;
    }

    var newProject = {
        name: postedProject.name,
        url: postedProject.url
    };

    var savedProject = yield db.projects.insert(newProject);
    this.set('Location', '/api/project/' + savedProject._id);
    this.status = 201;
}));


app.listen(3000);
console.log("Working...");