var expect = require('chai').expect;
var app = require('../server');
var request = require('supertest').agent(app.listen());
var co = require('co');
var tokenService = require('../lib/auth/jwtTokenService');

var db = require('../lib/db');
var loginUrl = '/login';

describe(loginUrl, function () {

    var testUser = {
        email: 'test@test.pl',
        password: 'test'
    };

    beforeEach(function (done) {
        co(function *() {
            yield db.users.remove({});
        }).then(function () {
            request.post('/register')
                .send(testUser)
                .end(done);
        }, done);
    });

    it("returns valid token for valid user", function (done) {

        request.post(loginUrl)
            .send(testUser)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                co(function * () {
                    var token = res.body.token;
                    var user = res.body.user;
                    var decodedToken = tokenService.decodeJwtToken(token);
                    var sub = decodedToken.sub;
                    var savedUser = yield db.users.findOne({email: testUser.email});
                    expect(sub).to.equal(savedUser._id.toString());
                    expect(user.id).to.equal(savedUser._id.toString());
                    expect(user.email).to.equal(savedUser.email);
                }).then(done, done);
            });
    });

    it('when email is wrong return 400', function (done) {
        testUser.email = 'wrong@email.com';
        request.post(loginUrl)
            .send(testUser)
            .end(function (err, res) {
                expect(res.status).to.equal(400);
                var msg = res.body.message;
                expect(msg).to.equals('Email or password incorrect');
                done();
            });
    });

    it('when password is wrong return 400', function (done) {
        testUser.password = 'wrongPassword';
        request.post(loginUrl)
            .send(testUser)
            .end(function (err, res) {
                expect(res.status).to.equal(400);
                var msg = res.body.message;
                expect(msg).to.equals('Email or password incorrect');
                done();
            });
    });
});