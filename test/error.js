import * as v from '../src';

describe('ValidateError', function() {
  it('should instanceof work', function() {
    const err = new v.ValidateError();
    err.should.be.instanceof(v.ValidateError);
    err.should.be.instanceof(Error);
    err.name.should.be.equal('ValidateError');
  });
});
