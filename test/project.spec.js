var expect = require('chai').expect;
var app = require('../app');
var request = require('supertest').agent(app.listen());

describe('project', function () {

    it('test setup', function () {
        request
            .get()
            .expect(200)
            .expect('Hello World');
    });
});