import should from 'should';
import _ from 'lodash/fp';
import * as v from '../src';

describe('validate easy', function() {
  it('should validate data', function() {
    v.v(
      v.required('foo', 'bar', 'baz'),
      v.prop('foo')(v.isNumber, v.lt(10), v.gt(0)),
      v.prop('bar')(_.trim, Number, v.isInteger)
    )({
      foo: 5,
      bar: ' 4',
      baz: null
    }).should.be.deepEqual({
      foo: 5,
      bar: 4,
      baz: null
    });
  });

  it('should throw error', function() {
    should.throws(
      () => {
        v.v(
          v.required('foo', 'bar', 'baz'),
          v.prop('foo')(v.isNumber, v.lt(10), v.gt(0)),
          v.prop('bar')(_.trim, Number, v.isInteger)
        )({
          foo: 25,
          bar: ' 4',
          baz: null
        });
      },
      v.ValidateError,
      'should throw an valid error'
    );
  });
});
