var parse = require('co-body');
var db = require('./db');

function votingOnOwnProject(project, user) {
    return project.authorId.toString() === user.id;
}
function * checkIfVoteAlreadyAdded(user) {
    var vote = yield db.votes.findOne({voterId: user.id});
    return !!vote;
}

function * addVote() {
    var postedVote = yield parse(this);

    var newVote = {
        projectId: postedVote.projectId,
        voterId: this.request.user.id
    };

    var project = yield db.projects.findOne({_id: postedVote.projectId});

    if (votingOnOwnProject(project, this.request.user)) {
        this.status = 400;
        this.body = {
            message: 'Can not vote on your own project'
        };
        return;
    }
    var voteAlreadyAdded = yield checkIfVoteAlreadyAdded(this.request.user);
    if (voteAlreadyAdded) {
        this.status = 400;
        this.body = {
            message: 'Can not vote again'
        };
        return;
    }
    var vote = yield db.votes.insert(newVote);
    this.set('Location', '/api/vote/' + vote._id);
    this.status = 201;
}

function * getVote() {
    var vote = yield db.votes.findOne({voterId: this.request.user.id});
    this.body = vote;
}

module.exports.addVote = addVote;
module.exports.getVote = getVote;


