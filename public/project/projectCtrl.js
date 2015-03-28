"use strict";

function projectCtrl(projectService) {

    var vm = this;

    function init() {
        projectService.getProjects().then(projects => {
            vm.projects = projects;
        });
    }

    init();
}

projectCtrl.$inject = ['projectService'];

export { projectCtrl }