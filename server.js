var koa = require('koa');
var route = require('koa-route');
var db = require('./lib/db');
var serve = require('koa-static');
var views = require('co-views');
var render = views(__dirname + '/views', {ext: 'ejs'});

var app = koa();
module.exports = app;

app.use(serve(__dirname + '/public'));

function * getProjects() {
    return yield db.projects.find({});
}

app.use(route.get('/api/project', function * () {
    this.body = yield getProjects();
}));

app.use(route.get('/', function *() {
    var projects = yield db.projects.find({});
    var vm = {
        projects: projects
    };
    this.body = yield render('projects', vm);
}));

app.use(route.get('/add-project', function *() {
    this.body = yield render('add-project');
}));



app.listen(3000);
console.log("Working...");