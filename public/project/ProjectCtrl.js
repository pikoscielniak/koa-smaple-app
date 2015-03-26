"use strict";

class ProjectCtrl {
    constructor(projectService) {
        this.projectService = projectService;
        this.init();
    }

    init() {
        this.projectService.getProjects().then(projects => {
            this.projects = projects;
            console.log(projects);
        });
    }
}

ProjectCtrl.$inject = ['ProjectService'];

export { ProjectCtrl }