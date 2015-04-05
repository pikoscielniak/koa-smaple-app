"use strict";

function authInterceptor(authTokenService) {

    function request(config) {
        var token = authTokenService.getToken();
        if (token) {
            config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
    }

    function response(response) {
        //TODO handle not authorized
        return response;
    }

    return {
        request: request,
        response: response
    };
}

authInterceptor.$inject = ['authTokenService'];

export { authInterceptor }