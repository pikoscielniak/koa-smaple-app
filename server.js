var koa = require('koa');
var router = require('koa-router')();
var serve = require('koa-static');
var project = require('./lib/project');
var vote = require('./lib/vote');
var http = require('http');
var app = koa();

var authService = require('./lib/auth/authService');
var authorize = require('./lib/auth/authorize');

router.post('/register', authService.register);
router.post('/login', authService.login);

app.use(serve(__dirname + '/public'));

router.get('/api/project', project.getAll);
router.get('/api/project/:id', project.getById);
router.post('/api/project', authorize, project.post);

router.post('/api/vote', authorize, vote.addVote);
router.get('/api/vote', authorize, vote.getVote);

app.use(router.routes());
app.use(router.allowedMethods());

var server = http.createServer(app.callback());
require('./lib/socketService').setup(server);
server.listen(process.env.PORT || 3000);
module.exports = app;
console.log("Working...");