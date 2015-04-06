"use strict";

function socketService() {

    var socket = io();
    var refreshHandler;


    socket.on('refresh projects', function () {
        if (refreshHandler) {
            refreshHandler();
        }
    });

    function emitVoteAdded() {
        socket.emit('vote added');
    }

    function emitProjectAdded() {
        socket.emit('project added');
    }

    function setRefreshHandler(handler) {
        refreshHandler = handler;
    }

    return {
        emitVoteAdded: emitVoteAdded,
        emitProjectAdded: emitProjectAdded,
        setRefreshHandler: setRefreshHandler
    }
}

export { socketService }