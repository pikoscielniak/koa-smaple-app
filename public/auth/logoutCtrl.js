"use strict";

function logoutCtrl(authService, $state) {
    authService.logout();
    $state.go('projects');
}

logoutCtrl.$inject = ['authService', '$state'];

export { logoutCtrl }