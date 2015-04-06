var expect = require('chai').expect;
var app = require('../server');
var request = require('supertest').agent(app.listen());
var co = require('co');
var db = require('../lib/db');
var testHelpers = require('./testHelpers');


describe('voting', function () {

    var testUser = {
        email: 'test@test.pl',
        password: 'test'
    };

    beforeEach(function (done) {
        co(function *() {
            yield testHelpers.clearEnvironment();
        }).then(function () {

        }, done);
    });

    it("add votes", function (done) {
        done();
    });
});