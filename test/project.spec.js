var expect = require('chai').expect;
var app = require('../server');
var request = require('supertest').agent(app.listen());
var co = require('co');

var db = require('../lib/db');

describe('project', function () {

    describe('get /projects', function () {

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

        it('shows all existing projects', function (done) {
            request.get('/projects')
                .expect(200)
                //.expect('Content-Type', /html/)
                .expect(function (res) {
                    expect(res.text).to.contain('<li>First project</li>');
                    expect(res.text).to.contain('<li>Second project</li>');
                })
                .end(done);
        });
    });
});