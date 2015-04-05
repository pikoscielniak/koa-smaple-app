"use strict";

function headerCtrl(authTokenService) {
    var vm = this;
    vm.isAuthenticated = authTokenService.isAuthenticated();
}

headerCtrl.$inject = ['authTokenService'];

export { headerCtrl }