"use strict";

function addProjectCtrl(projectService, $state) {

    var vm = this;
    vm.project = {};
    vm.serverMessage = '';

    var addSuccess = (data) => {
        debugger;
        $state.go('add-project-confirm', {location: data});
    };

    var addFail = (response) => {
        debugger;
        vm.serverMessage = response.data.message;
    };

    vm.addProject = project => {
        vm.serverMessage = '';
        projectService.addProject(project)
            .then(addSuccess, addFail);
    };
}

addProjectCtrl.$inject = ['projectService', '$state'];

export { addProjectCtrl }