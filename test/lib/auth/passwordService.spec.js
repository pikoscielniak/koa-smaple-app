var expect = require('chai').expect;
var service = require('../../../lib/auth/passwordService');
var co = require('co');

describe('passwordService', function () {

    describe('hash', function () {
        it('returns hashed password', function (done) {

            co(function *() {
                var password = 'testtest';

                var hash = yield service.hash(password);
                expect(hash).to.have.length.above(10);
            }).then(done, done);

        });
    });

    describe('compare', function () {
        it('returns true when password and hash match', function (done) {

            co(function *() {
                var password = 'testtest';

                var hash = yield service.hash(password);
                var compare = yield service.compare(password, hash);
                expect(compare).to.equals(true);
            }).then(done, done);

        });

        it('returns false when password and hash do not match', function (done) {

            co(function *() {
                var password = 'testtest';

                var hash = yield service.hash(password);
                password = 'changePassword'
                var compare = yield service.compare(password, hash);
                expect(compare).to.equals(false);
            }).then(done, done);

        });
    });

});