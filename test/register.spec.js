var expect = require('chai').expect;
var app = require('../server');
var request = require('supertest').agent(app.listen());
var co = require('co');
var tokenService = require('../lib/auth/jwtTokenService');

var testHelpers = require('./testHelpers');
var db = require('../lib/db');
var registerUrl = '/register';

describe(registerUrl, function () {

    var testUser = {
        email: 'test@test.pl',
        password: 'test'
    };

    beforeEach(function (done) {
        co(function *() {
            yield testHelpers.clearEnvironment();
        }).then(done, done);
    });

    it("creates user and returns token", function (done) {

        request.post(registerUrl)
            .send(testUser)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                var user = res.body.user;
                var token = res.body.token;
                expect(token).to.have.length.above(20);
                co(function * () {
                    var savedUser = yield db.users.findOne({email: user.email});
                    expect(savedUser.email).to.equal(user.email);
                }).then(done, done);
            });
    });

    it('token has valid data', function (done) {
        request.post(registerUrl)
            .send(testUser)
            .end(function (err, res) {
                var token = res.body.token;
                co(function * () {
                    var decodedToken = tokenService.decodeJwtToken(token);
                    var sub = decodedToken.sub;
                    var savedUser = yield db.users.findOne({email: testUser.email});
                    expect(sub).to.equal(savedUser._id.toString());
                }).then(done, done);
            });
    });

    it('when user already exists returns 400 with proper message', function (done) {
        co(function *() {
            yield db.users.insert(testUser);
            request.post(registerUrl)
                .send(testUser)
                .end(function (err, res) {
                    var msg = res.body.message;
                    expect(res.status).to.equal(400);
                    expect(msg).to.equals('Email already exists');
                });
        }).then(done, done);
    });
});