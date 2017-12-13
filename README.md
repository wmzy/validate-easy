## Validate easy

> (wip) Validate your data easy with pipe style.

### Install

```bash
npm install validate-easy
```

### Usage

```javascript
import v from 'validate-easy';

const data = v(
  v.hasProps('foo', 'bar', 'baz'),
  v.path('foo')(v.isNumber, v.lt(10), v.gt(0)),
  v.path('bar')(_.trim, Number, v.isInt)
)({
  foo: 5,
  bar: ' 4',
  baz: null
})

if (v.isValidateError(data)) {
  // todo
} else {
  // result
  // {
  //   foo: 5,
  //   bar: 4,
  //   baz: null
  // }
}

```

### TODO

- [x] pipe function
- [ ] build for node and browser
- [ ] async validator

