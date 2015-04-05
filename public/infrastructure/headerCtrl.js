"use strict";

function headerCtrl(authService) {
    var vm = this;
    vm.isAuthenticated = authService.isAuthenticated;
}

headerCtrl.$inject = ['authTokenService'];

export { headerCtrl }