import * as mocha from 'mocha';
import app from '../App';

//require chai and use should() assertions
import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

describe("testroute", function () {
  it('it should give back a message', () => {
      chai.request(app)
          .get('/api/test')
          .then(result => {
              result.should.have.status(200);
              result.body.should.eql({msg: 'ok'});
      });
  });
});