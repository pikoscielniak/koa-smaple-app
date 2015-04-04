var expect = require('chai').expect;
var app = require('../server');
var request = require('supertest').agent(app.listen());
var co = require('co');

var db = require('../lib/db');
var registerUrl = '/register';

describe('register and login', function () {
    beforeEach(function (done) {
        co(function *() {
            yield db.users.remove({});
        }).then(done, done);
    });

    describe(registerUrl, function () {
        it("creates user and returns token", function (done) {
            var user = {
                email: 'test@test.pl',
                password: 'test'
            };
            request.post(registerUrl)
                .send(user)
                .end(function (err, res) {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.have.length.above(20);
                    co(function * () {
                        var savedUser = yield db.users.findOne({email: user.email});
                        expect(savedUser.email).to.equal(user.email);
                    }).then(done, done);
                })
        });

        it('token has valid data', function (done) {
            done();
        });
    });
});