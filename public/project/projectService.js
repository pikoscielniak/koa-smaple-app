"use strict";

function projectService($http) {
    var url = '/api/project';

    function successCallback(response) {
        return response.data;
    }

    function failCallback(response) {
        return response.data;
    }

    function getProjects() {
        return $http.get(url).then(successCallback, failCallback);
    }

    function addProject(project) {
        return $http.post(url, project).then(r => {
                return r.headers('Location');
            });
    }

    function getProjectForUlr(url) {
        return $http.get(url).then(successCallback, failCallback);
    }

    return {
        getProjects: getProjects,
        addProject: addProject,
        getProjectForUlr: getProjectForUlr
    }
}

projectService.$inject = ['$http'];

export { projectService }