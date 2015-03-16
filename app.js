var koa = require('koa');
var app = koa();
module.exports = app;
app.use(function *() {
    this.body = 'Hello World';
});

app.listen(3000);