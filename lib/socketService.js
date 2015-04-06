module.exports.setup = function (server) {
    var io = require('socket.io')(server);
    io.on('connection', function (socket) {
        socket.on('vote added', function () {
            socket.broadcast.emit('refresh projects', {});
        });
        socket.on('project added', function () {
            socket.broadcast.emit('refresh projects', {});
        });
    });
};