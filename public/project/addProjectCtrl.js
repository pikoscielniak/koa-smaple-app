"use strict";

function addProjectCtrl(projectService, $state, alertService) {

    var vm = this;
    vm.project = {};
    vm.serverMessage = '';

    var addSuccess = (projectUrl) => {
        projectService.getProjectByUlr(projectUrl)
            .then((project) => {
                var msg = `The project ${project.name} was added`;
                alertService.show('success', 'Confirmation', msg);
                $state.go('projects');
            });
    };

    var addFail = (response) => {
        vm.serverMessage = response.data.message;
    };

    vm.addProject = project => {
        vm.serverMessage = '';
        projectService.addProject(project)
            .then(addSuccess, addFail);
    };
}

addProjectCtrl.$inject = ['projectService', '$state', 'alertService'];

export { addProjectCtrl }