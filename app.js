var koa = require('koa');
var route = require('koa-route');
var monk = require('monk');
var app = koa();
var db = monk(process.env.DB_CONNECTION)
var wrap = require('co-monk');

module.exports = app;

function * getProjects() {

}

app.use(route.get('/project', function * () {
    var projects = wrap(db.get('projects'));
    this.body = yield projects.find({});
}));


app.listen(3000);