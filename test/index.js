import should from 'should';
import _ from 'lodash/fp';
import v from '../src';

describe('Validate style', function () {
  it('pipe validate data', function () {
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

  it('assert result', function () {
    const data = v(
      v.hasProps('foo', 'bar', 'baz'),
      v.path('foo')(v.isNumber, v.lt(10), v.gt(0)),
      v.path('bar')(_.trim, Number, v.isInt)
    )({
      foo: 25,
      bar: ' 4',
      baz: null
    })

    should.throws(() => v.assert(data), v.ValidateError, 'should throw an valid error');
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
