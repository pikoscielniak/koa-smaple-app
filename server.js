var koa = require('koa');
var route = require('koa-route');
var db = require('./lib/db');
var serve = require('koa-static');

var app = koa();
module.exports = app;

app.use(serve(__dirname + '/public'));

function * getProjects() {
    return yield db.projects.find({});
}

app.use(route.get('/api/project', function * () {
    this.body = yield getProjects();
}));

app.listen(3000);
console.log("Working...");