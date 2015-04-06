var parse = require('co-body');
var db = require('./db');

function votingOnOwnProject(project, user) {
    return project.authorId.toString() === user.id;
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

    var vote = yield db.votes.insert(newVote);
    this.set('Location', '/api/vote/' + vote._id);
//var existingProject = yield db.projects.find({$or: [{name: postedProject.name}, {url: postedProject.url}]});
    this.status = 201;
}

module.exports.addVote = addVote;

