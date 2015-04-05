"use strict";

function registerCtrl(alertService, authService) {

    var vm = this;
    vm.email = '';
    vm.password = '';
    vm.passwordConfirm = '';

    vm.submit = function (email, password) {
        authService.register(email, password)
            .then(function (res) {
                alertService.show('success', 'Account Created!', 'Welcome, ' + res.data.user.email + '!');
            })
            .catch(function () {
                alertService.show('warning', 'Opps!', 'Could not register');
            });
    };
}

registerCtrl.$inject = ['alertService', 'authService'];

export { registerCtrl }