"use strict";

function authService($http, authTokenService, $state) {
    var loginUrl = '/login';
    var registerUrl = '/register';

    function login(email, password) {
        return $http.post(loginUrl, {
            email: email,
            password: password
        }).success(authSuccessful);
    }

    function authSuccessful(res) {
        authTokenService.setToken(res.token);
        $state.go('projects');
    }

    function register(email, password) {
        return $http.post(registerUrl, {
            email: email,
            password: password
        }).success(authSuccessful);
    }

    return {
        login: login,
        register: register
    }
}

authService.$inject = ['$http', 'authTokenService', '$state'];

export { authService }