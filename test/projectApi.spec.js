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
                    projects.insert({title: 'First project'}),
                    projects.insert({title: 'Second project'})
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
                    expect(projects[0].title).to.equal('First project');
                    expect(projects[1].title).to.equal('Second project');
                })
                .end(done);
        });
    });
});