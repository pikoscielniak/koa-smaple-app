"use strict";

function projectCtrl(projectService, authService, userVote) {

    var vm = this;
    vm.canVote = authService.isAuthenticated();

    function init() {
        projectService.getProjects().then(projects => {
            vm.projects = projects;
        });
    }



    function vote(project) {

    }

    init();
}

projectCtrl.$inject = ['projectService', 'authService'];

export { projectCtrl }