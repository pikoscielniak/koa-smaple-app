var koa = require('koa');
var router = require('koa-router')();
var serve = require('koa-static');
var project = require('./lib/project');
var vote = require('./lib/vote');

var authService = require('./lib/auth/authService');
var authorize = require('./lib/auth/authorize');

var app = koa();
module.exports = app;

router.post('/register', authService.register);
router.post('/login', authService.login);

app.use(serve(__dirname + '/public'));

router.get('/api/project', project.getAll);
router.get('/api/project/:id', project.getById);
router.post('/api/project', authorize, project.post);

router.post('/api/vote', authorize, vote.addVote);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
console.log("Working...");