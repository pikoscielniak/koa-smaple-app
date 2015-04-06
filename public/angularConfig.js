"use strict";

function angularConfig($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise("/projects");

    $stateProvider
        .state('projects', {
            url: "/projects",
            templateUrl: "project/projectList.html",
            controller: 'projectCtrl as vm'
        })
        .state('add-project', {
            url: "/add-project",
            templateUrl: "project/addProject.html",
            controller: 'addProjectCtrl as vm'
        })
        .state('register', {
            url: '/register',
            templateUrl: '/auth/register.html',
            controller: 'registerCtrl as vm'
        })
        .state('login', {
            url: '/login',
            templateUrl: '/auth/login.html',
            controller: 'loginCtrl as vm'
        })
        .state('logout', {
            url: '/logout',
            controller: 'logoutCtrl'
        });
    $httpProvider.interceptors.push('authInterceptor');
}

angularConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

export default angularConfig