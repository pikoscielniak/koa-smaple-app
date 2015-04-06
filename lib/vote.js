var parse = require('co-body');
var db = require('./db');

function * addVote() {
    var postedVote = yield parse(this);

    var newVote = {
        projectId: postedVote.projectId,
        voterId: this.request.user.id
    };

    var vote = yield db.votes.insert(newVote);
    this.set('Location', '/api/vote/' + vote._id);
//var existingProject = yield db.projects.find({$or: [{name: postedProject.name}, {url: postedProject.url}]});
    this.status = 201;
}

module.exports.addVote = addVote;

