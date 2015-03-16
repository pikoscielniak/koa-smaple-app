var koa = require('koa');
var route = require('koa-route');
var db = require('./lib/db');

var app = koa();
module.exports = app;

function * getProjects() {
    return yield db.projects.find({});
}

app.use(route.get('/project', function * () {
    this.body = yield getProjects();
}));


app.listen(3000);