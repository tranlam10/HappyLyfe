'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);

describe('status 200 works', function() {
    it('should return status of 200', function() {
        return chai.request('http://localhost:8080', function (){
            expect(res).to.have.status(200);
        });
    });
});