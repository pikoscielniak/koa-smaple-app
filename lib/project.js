var _ = require('lodash');
var parse = require('co-body');

var db = require('./db');

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

function * post() {
    var postedProject = yield parse(this);

    var existingProject = yield db.projects.find({$or: [{name: postedProject.name}, {url: postedProject.url}]});
    if (existingProject && existingProject.length > 0) {
        this.body = {message: 'Project exists'};
        this.status = 400;
        return;
    }

    var newProject = {
        name: postedProject.name,
        url: postedProject.url
    };

    var savedProject = yield db.projects.insert(newProject);
    this.set('Location', '/api/project/' + savedProject._id);
    this.status = 201;
}


module.exports.getAll = getAll;
module.exports.getById = getById;
module.exports.post = post;