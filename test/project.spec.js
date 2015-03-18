var expect = require('chai').expect;
var app = require('../app');
var request = require('supertest').agent(app.listen());
var co = require('co');

var db = require('../lib/db');

describe('project', function () {

    describe('get /project', function () {

        beforeEach(function (done) {

            co(function *() {
                var projects = db.projects;
                yield projects.remove({});
                var yieldables = [
                    projects.insert({title: 'First project'}),
                    projects.insert({title: 'Second project'})
                ];
                //yield projects.insert({title: 'First project'});
                //yield projects.insert({title: 'Second project'});
                yield yieldables;
            }).then(done, done);
        });

        it('returns all existing projects', function (done) {
            request.get('/project')
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