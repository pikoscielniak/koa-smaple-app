"use strict";

function addProjectConfirmCtrl(projectService, $stateParams) {

    var vm = this;

    function init() {
        debugger
        var url = $stateParams.location;
        if (url) {
            projectService.getProjectForUlr(url)
                .then(d => {
                    vm.project = d;
                });
        }
    }

    init();
}

addProjectConfirmCtrl.$inject = ['projectService', '$stateParams'];
export { addProjectConfirmCtrl }