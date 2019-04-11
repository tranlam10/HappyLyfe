'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const { app } = require('../server');
chai.use(chaiHttp);

describe('status 200 works', function() {
    it('should return status of 200', function() {
        return chai.request(app)
            .get("/")
            .then(function(res) {
                expect(res).to.have.status(200);
            });
    });
});