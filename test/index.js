import v from '..';

describe('Pipe', function () {
  it('should pipe functions', function () {
    v(
      v.hasProps('foo', 'bar', 'baz'),
      v.props(v.isNumber, v.lt(10), v.gt(0))('foo'),
      v.props(v.trim, Number, v.isInt)('bar')
    )({
      foo: 5,
      bar: ' 4',
      baz: null
    })
      .should.be.eq({
      foo: 5,
      bar: 4,
      baz: null
    })
  })
})
