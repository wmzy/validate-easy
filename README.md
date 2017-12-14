[![Build Status](https://travis-ci.org/wmzy/validate-easy.svg?branch=master)](https://travis-ci.org/wmzy/validate-easy)
[![Coverage Status](https://coveralls.io/repos/github/wmzy/validate-easy/badge.svg?branch=master)](https://coveralls.io/github/wmzy/validate-easy?branch=master)
## Validate easy

> (wip) Validate your data easy with pipeline style.

### Install

```bash
npm install validate-easy
```

### Usage

```javascript
import _ from 'lodash';
import v from 'validate-easy';

const data = v.assert(
  v.hasProps('foo', 'bar', 'baz'),
  v.path('foo')(v.isNumber, v.lt(10), v.gt(0)),
  v.path('bar')(_.trim, Number, v.isInt)
)({
  foo: 5,
  bar: ' 4',
  baz: null
})

console.log(data);
// result
// {
//   foo: 5,
//   bar: 4,
//   baz: null
// }

```

### TODO

- [x] pipe function
- [ ] build for node and browser
- [ ] async validator

