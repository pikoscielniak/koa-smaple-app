"use strict";

function projectCtrl(projectService) {

    var vm = this;

    function init() {
        projectService.getProjects().then(projects => {
            vm.projects = projects;
            console.log(projects);
        });
    }

    init();
}

projectCtrl.$inject = ['projectService'];

export { projectCtrl }