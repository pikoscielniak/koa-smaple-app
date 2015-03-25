var expect = require('chai').expect;
var app = require('../server');
var request = require('supertest').agent(app.listen());
var co = require('co');

var db = require('../lib/db');

describe('project', function () {

    describe('get /', function () {

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
            request.get('/')
                .expect(200)
                .expect('Content-Type', /html/)
                .expect(function (res) {
                    expect(res.text).to.contain('First project');
                    expect(res.text).to.contain('Second project');
                })
                .end(done);
        });
    });

    describe('get /add', function () {

        beforeEach(function (done) {
            co(function *() {
                var projects = db.projects;
                yield projects.remove({});
            }).then(done, done);
        });

        it('returns form to add project', function (done) {
            request.get('/add-project')
                .expect(200)
                .expect('Content-Type', /html/)
                .end(done);
        });
    });
});