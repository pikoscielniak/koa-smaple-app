var expect = require('chai').expect;
var app = require('../server');
var request = require('supertest').agent(app.listen());
var co = require('co');

var db = require('../lib/db');

describe('project api', function () {

    describe('get /api/project', function () {

        beforeEach(function (done) {
            co(function *() {
                var projects = db.projects;
                yield projects.remove({});
                var yieldables = [
                    projects.insert({name: 'First project', url: 'http://project1.com'}),
                    projects.insert({name: 'Second project', url: 'http://project2.com'})
                ];
                yield yieldables;
            }).then(done, done);
        });

        it('returns all existing projects', function (done) {
            request.get('/api/project')
                .expect(200)
                .expect(function (res) {
                    var projects = res.body;
                    expect(projects).to.have.length(2);
                    expect(projects[0].name).to.equal('First project');
                    expect(projects[0].url).to.equal('http://project1.com');
                    expect(projects[1].name).to.equal('Second project');
                    expect(projects[1].url).to.equal('http://project2.com');
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
            var testProject = {
                name: 'test project',
                url: 'http://test-project.com'
            };
            request.post('/api/project')
                .send(testProject)
                .expect('Location', /^\/api\/project\/[0-9a-fA-F]{24}$/)
                .end(function (err, res) {
                    var location = res.header.location;
                    expect(res.status).to.equal(201);
                    co(function * () {
                        var id = location.match(/[0-9a-fA-F]{24}$/)[0];
                        var projects = yield db.projects.find({_id: id});
                        var justCreatedProject = projects[0];
                        expect(justCreatedProject.name).to.equal(testProject.name);
                        expect(justCreatedProject.url).to.equal(testProject.url);
                    }).then(done, done);
                });
        });

        it("not allow project with existing name", function (done) {
            var existingProject = {
                name: 'test project',
                url: 'http://test-project.com'
            };

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
            var existingProject = {
                name: 'test project',
                url: 'http://test-project.com'
            };

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
                var projects = db.projects;
                yield projects.remove({});
                var yieldables = [
                    projects.insert({name: 'First project', url: 'http://project1.com'}),
                    projects.insert({name: 'Second project', url: 'http://project2.com'})
                ];
                insertedProjects = yield yieldables;
            }).then(done, done);
        });

        it('returns project by id', function (done) {
            request.get('/api/project/' + insertedProjects[0]._id)
                .expect(200)
                .expect(function (res) {
                    var project = res.body;
                    expect(project.name).to.equal('First project');
                    expect(project.url).to.equal('http://project1.com');
                })
                .end(done);
        });
    });
});