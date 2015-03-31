var db = require('./db');
var _ = require('lodash');

function * getProjects() {
    var projects = yield db.projects.find({});
    var votes = yield db.votes.find({});
    _.each(projects, function (project) {
        project.votes = _.chain(votes).filter(function (vote) {
            return vote.projectId.toString() === project._id.toString()
        }).size().value();
    });
    return projects;
}

function * getAll() {
    this.body = yield getProjects();
}

function * getById(id) {
    this.body = yield db.projects.findById(id);
}


module.exports.getAll = getAll;
module.exports.getById = getById;