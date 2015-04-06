var expect = require('chai').expect;
var app = require('../server');
var request = require('supertest').agent(app.listen());
var co = require('co');
var db = require('../lib/db');
var testHelpers = require('./testHelpers');
var jwtTokenService = require('../lib/auth/jwtTokenService');

describe.only('voting', function () {

    var testUser1 = {
        email: 'test@test.pl',
        password: 'test'
    };
    var testUser2 = {
        email: 'test2@test.pl',
        password: 'test'
    };

    var testProject = {
        name: 'First project', url: 'http://project1.com'
    };

    var authorToken;
    var voterToken;
    var projectId;
    var parsedVoterToken;

    function addProject(request, project, token) {
        return new Promise(function (resolve, reject) {
            request.post('/api/project')
                .set('Authorization', 'Bearer ' + token)
                .send(project)
                .end(function (err, res) {
                    if (err) return reject(err);
                    var projectId = res.headers.location.split('/')[3];
                    resolve(projectId);
                });
        });
    }

    beforeEach(function (done) {
        co(function *() {
            yield testHelpers.clearEnvironment();
            authorToken = yield testHelpers.registerUser(request, testUser1);
            voterToken = yield testHelpers.registerUser(request, testUser2);
            parsedVoterToken = jwtTokenService.decodeJwtToken(voterToken);
            projectId = yield addProject(request, testProject, authorToken);
        }).then(done, done);
    });

    it("add vote", function (done) {
        request.post('/api/vote')
            .send({projectId: projectId})
            .expect('Location', /^\/api\/vote\/[0-9a-fA-F]{24}$/)
            .set('Authorization', 'Bearer ' + voterToken)
            .end(function (err, res) {
                co(function * () {
                    expect(res.status).to.equal(201);
                    var alreadyAddedVote = yield db.votes.findOne({
                        projectId: projectId,
                        voterId: parsedVoterToken.sub
                    });
                    expect(alreadyAddedVote).to.be.ok;
                }).then(done, done);
            });
    });
});