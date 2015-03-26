"use strict";

class ProjectService {
    constructor($http) {
        this.$http = $http;
    }

    getProjects() {
        return this.$http.get('/api/project').then(r =>{
            debugger;
            return r.data;
        })
    }

    static factory($http) {
        return new ProjectService($http);
    }
}

ProjectService.factory.$inject = ['$http'];

export { ProjectService }