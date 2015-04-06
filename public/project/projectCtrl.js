"use strict";

function projectCtrl(projectService, authService, voteService, alertService, socketService) {

    var vm = this;
    vm.canVote = authService.isAuthenticated();
    socketService.setRefreshHandler(init);

    function init() {
        projectService.getProjects().then(projects => {
            vm.projects = projects;
        });
        if (authService.isAuthenticated()) {
            voteService.getVote()
                .then((vote)=> vm.userVote = vote);
        }
    }

    function addVoteFail(res) {
        var msg = res.data.message;
        alertService.show('warning', 'Opps!', msg + '!');
    }

    vm.voteDisabled = function () {
        return !!vm.userVote;
    };

    function addVoteSuccess() {
        init();
        alertService.show('success', 'Vote added', 'Thank you for your vote.');
        socketService.emitVoteAdded();
    }

    function vote(project) {
        voteService.vote(project._id).then(addVoteSuccess, addVoteFail);
    }

    vm.vote = vote;

    init();
}

projectCtrl.$inject = ['projectService', 'authService', 'voteService', 'alertService', 'socketService'];

export { projectCtrl }