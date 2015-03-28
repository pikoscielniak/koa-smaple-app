var expect = require('chai').expect;
var app = require('../server');
var request = require('supertest').agent(app.listen());
var co = require('co');

var db = require('../lib/db');
var testProject1 = {name: 'First project', url: 'http://project1.com', votes: []};
var testProject2 = {name: 'First project', url: 'http://project1.com', votes: []};

function * addTestProjects() {
    var projects = db.projects;
    yield projects.remove({});
    var yieldables = [
        projects.insert(testProject1),
        projects.insert(testProject2)
    ];
    var result = yield yieldables;
    return result;
}

describe('project api', function () {

    describe('get /api/project', function () {

        beforeEach(function (done) {
            co(function *() {
                yield addTestProjects();
            }).then(done, done);
        });

        it('returns all existing projects', function (done) {
            request.get('/api/project')
                .expect(200)
                .expect(function (res) {
                    var projects = res.body;
                    expect(projects).to.have.length(2);
                    expect(projects[0].name).to.equal(testProject1.name);
                    expect(projects[0].url).to.equal(testProject1.url);
                    expect(projects[1].name).to.equal(testProject1.name);
                    expect(projects[1].url).to.equal(testProject2.url);
                })
                .end(done);
        });
    });

    describe('post /api/project', function () {
        beforeEach(function (done) {
            co(function *() {
                var projects = db.projects;
                yield projects.remove({});
            }).then(done, done);
        });

        it("adds new projects", function (done) {
            request.post('/api/project')
                .send(testProject1)
                .expect('Location', /^\/api\/project\/[0-9a-fA-F]{24}$/)
                .end(function (err, res) {
                    var location = res.header.location;
                    expect(res.status).to.equal(201);
                    co(function * () {
                        var id = location.match(/[0-9a-fA-F]{24}$/)[0];
                        var projects = yield db.projects.find({_id: id});
                        var justCreatedProject = projects[0];
                        expect(justCreatedProject.name).to.equal(testProject1.name);
                        expect(justCreatedProject.url).to.equal(testProject1.url);
                    }).then(done, done);
                });
        });

        it("not allow project with existing name", function (done) {
            var existingProject = testProject1;

            co(function *() {
                yield db.projects.insert(existingProject);
                existingProject.name = 'new name';
                request.post('/api/project')
                    .send(existingProject)
                    .end(function (err, res) {
                        var msg = res.body;
                        expect(res.status).to.equal(400);
                        expect(msg.message).to.equal('Project exists');
                        done()
                    });
            });
        });


        it("not allow project with existing url", function (done) {
            var existingProject = testProject1;

            co(function *() {
                yield db.projects.insert(existingProject);
                existingProject.url = 'http://new-url.com';
                request.post('/api/project')
                    .send(existingProject)
                    .end(function (err, res) {
                        var msg = res.body;
                        expect(res.status).to.equal(400);
                        expect(msg.message).to.equal('Project exists');
                        done()
                    });
            });
        });
    });

    describe('get /api/project/:id', function () {

        var insertedProjects;

        beforeEach(function (done) {
            co(function *() {
                insertedProjects = yield addTestProjects();
            }).then(done, done);
        });

        it('returns project by id', function (done) {
            request.get('/api/project/' + insertedProjects[0]._id)
                .expect(200)
                .expect(function (res) {
                    var project = res.body;
                    expect(project.name).to.equal(testProject1.name);
                    expect(project.url).to.equal(testProject1.url);
                })
                .end(done);
        });
    });
});