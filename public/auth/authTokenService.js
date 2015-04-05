"use strict";

function authTokenService($window) {

    var storage = $window.localStorage;
    var cachedToken;
    var storageKey = 'userToken';

    function setToken(token) {
        cachedToken = token;
        storage.setItem(storageKey, token);
    }

    function getToken() {
        if (!cachedToken) {
            cachedToken = storage.getItem(storageKey);
        }
        return cachedToken;
    }

    function isAuthenticated() {
        return !!getToken();
    }

    function removeToken() {
        cachedToken = null;
        storage.removeItem(storageKey);
    }

    return {
        setToken: setToken,
        getToken: getToken,
        isAuthenticated: isAuthenticated,
        removeToken: removeToken
    };
}

authTokenService.$inject = ['$window'];

export { authTokenService }