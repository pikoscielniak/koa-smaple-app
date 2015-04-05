"use strict";

function alertService($timeout, $rootScope) {

    var alertTimeout;

    function show(type, title, message, timeout = 2000) {
        $rootScope.alert = {
            hasBeenShown: true,
            show: true,
            type: type,
            message: message,
            title: title
        };
        $timeout.cancel(alertTimeout);
        alertTimeout = $timeout(function () {
            $rootScope.alert.show = false;
        }, timeout);
    }

    return {
        show: show
    }
}

alertService.$inject = ['$timeout', '$rootScope'];

export { alertService }