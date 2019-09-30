[![Build Status](https://travis-ci.org/wmzy/validate-easy.svg?branch=master)](https://travis-ci.org/wmzy/validate-easy)
[![Coverage Status](https://coveralls.io/repos/github/wmzy/validate-easy/badge.svg?branch=master)](https://coveralls.io/github/wmzy/validate-easy?branch=master)
# Validate Easy

> Validate your data easy with pipeline style.

## Why

Most existing validation libraries are based on the schema, which makes it so heavy and hard to extend.

- **Tiny and tree-shaking friendly.** 
- **Easy to extend.**
- **Easy to combine with other libraries.**
- **Detailed errors.**

## Install

```bash
npm install validate-easy
```

## Usage

```javascript
import _ from 'lodash';
import * as v from 'validate-easy';

const data = v.v(
  v.required('foo', 'bar', 'baz'),
  v.prop('foo')(v.isNumber, v.lt(10), v.gt(0)),
  v.prop('bar')(_.trim, Number, v.isInt)
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

## Error Handling

// todo

## TODO

- [x] pipe function
- [ ] build for node and browser
- [ ] async validator

