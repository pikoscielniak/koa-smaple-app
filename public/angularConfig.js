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
            controller: 'ProjectCtrl as vm'
        })
        .state('add-project', {
            url: "/add-project",
            templateUrl: "project/addProject.html",
            controller: function ($scope) {
                $scope.items = ["A", "List", "Of", "Items"];
            }
        });
}

angularConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export default angularConfig