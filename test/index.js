import _ from 'lodash/fp';
import v from '../src';

describe('Pipe', function () {
  it('should validate pipe', function () {
    v(
      v.hasProps('foo', 'bar', 'baz'),
      v.path('foo')(v.isNumber, v.lt(10), v.gt(0)),
      v.path('bar')(_.trim, Number, v.isInt)
    )({
      foo: 5,
      bar: ' 4',
      baz: null
    })
      .should.be.deepEqual({
      foo: 5,
      bar: 4,
      baz: null
    })
  })
})

describe('ValidateError', function() {
  it('should instanceof work', function() {
    const err = new v.ValidateError();
    err.should.be.instanceof(v.ValidateError);
    err.should.be.instanceof(Error);
    err.name.should.be.equal('ValidateError')
  })
})
