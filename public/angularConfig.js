"use strict";

function angularConfig($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/projects");
    //
    // Now set up the states
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
        .state('add-project-confirm', {
            url: "/add-project-confirm",
            templateUrl: "project/addProjectConfirm.html",
            params: {location: null},
            controller: 'addProjectConfirmCtrl as vm'
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
        });

}

angularConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export default angularConfig