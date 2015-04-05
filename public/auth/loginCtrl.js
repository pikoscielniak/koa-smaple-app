"use strict";

function loginCtrl(alertService, authService) {

    var vm = this;
    vm.email = '';
    vm.password = '';

    vm.submit = function (email, password) {
        debugger;
        authService.login(email, password).then(function (res) {
            var message = 'Thanks for coming back ' + res.data.user.email + '!';
            alertService.show('success', 'Welcome', message);
        }).catch(handleError);
    };

    function handleError(err) {
        alertService.show('warning', 'Something went wrong :(', err.message);
    }
}

loginCtrl.$inject = ['alertService', 'authService'];

export { loginCtrl }