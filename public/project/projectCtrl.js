"use strict";

function projectCtrl(projectService, authService, voteService, alertService) {

    var vm = this;
    vm.canVote = authService.isAuthenticated();

    function init() {
        projectService.getProjects().then(projects => {
            vm.projects = projects;
        });
        voteService.getVote()
            .then((vote)=> vm.userVote = vote);
    }

    function addVoteFail(res) {
        var msg = res.data.message;
        alertService.show('warning', 'Opps!', msg + '!');
    }

    function addVoteSuccess(res, a, b, c) {
        debugger;
        //TODO add user vote vm.userVote
    }

    function vote(project) {
        voteService.vote(project._id).then(addVoteSuccess, addVoteFail);
    }

    vm.vote = vote;

    init();
}

projectCtrl.$inject = ['projectService', 'authService', 'voteService', 'alertService'];

export { projectCtrl }