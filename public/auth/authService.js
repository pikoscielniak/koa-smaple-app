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

    function logout() {
        authTokenService.removeToken();
    }

    function isAuthenticated() {
        return authTokenService.isAuthenticated();
    }

    return {
        login: login,
        register: register,
        logout: logout,
        isAuthenticated: isAuthenticated

    }
}

authService.$inject = ['$http', 'authTokenService', '$state'];

export { authService }