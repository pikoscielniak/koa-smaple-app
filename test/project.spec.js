var expect = require('chai').expect;
var app = require('../server');
var request = require('supertest').agent(app.listen());
var co = require('co');

var db = require('../lib/db');

describe('project', function () {

    describe('get /projects', function () {


        it('shows all existing projects', function (done) {
            request.get('/projects')
                .expect(200)
                //.expect('Content-Type', /html/)
                .expect(function (res) {
                    expect(res.text).to.be.eql('<h3>Test</h3>');
                })
                .end(done);
        });
    });
});