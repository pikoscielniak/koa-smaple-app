var koa = require('koa');
var route = require('koa-route');
var serve = require('koa-static');
var parse = require('co-body');
var db = require('./lib/db');

var app = koa();
module.exports = app;

app.use(serve(__dirname + '/public'));

function * getProjects() {
    return yield db.projects.find({});
}

app.use(route.get('/api/project', function * () {
    this.body = yield getProjects();
}));

app.use(route.post('/api/project', function * () {
    var postedProject = yield parse(this);
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