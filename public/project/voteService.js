"use strict";

function voteService($http, authService) {
    var url = '/api/vote';

    function successCallback(response) {
        return response.data;
    }

    function failCallback(response) {
        return response.data;
    }

    function getVote() {
        return $http.get(url).then(successCallback, failCallback);
    }

    function vote(projectId) {
        return $http.post(url, {
            projectId: projectId
        });
    }

    return {
        getVote: getVote,
        vote: vote
    }
}


voteService.$inject = ['$http', 'authService'];

export { voteService }