import _ from 'lodash/fp';

export class ValidateError extends Error {
    constructor(message) {
      super(message);
      this.path = [];

      this.constructor = ValidateError
      this.__proto__   = ValidateError.prototype
      this.name = this.constructor.name;
      if (typeof Error.captureStackTrace === 'function') {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = (new Error(message)).stack;
      }
    }

    join(path) {
        this.path.unshift(path);
    }

    toString() {
      let path = this.path.join('.');
      path = path ? `[${path}]` : 'value';

      return `${this.name || 'Error'}: ${path} ${this.message}`
    }
}

export default function validate(...fnArr) {
  return value => {
    for (let fn of fnArr) {
      value = fn(value);
      if (value instanceof ValidateError) return value;
    }
    return value;
  }
}

export function assert(...fnArr) {
  return value => {
    for (let fn of fnArr) {
      value = fn(value);
      if (value instanceof ValidateError) throw value;
    }
    return value;
  }
}

export function path(path) {
  return (...fnArr) => value => {
    const res = validate(...fnArr)(_.get(path, value));
    if (res instanceof ValidateError) {
      res.join(path);
      return res;
    }
    return _.set(path, res, value);
  }
}

export function wrap (fn, message) {
  return v => {
    if (fn(v)) return v;
    return new ValidateError(message);
  }
}

export function hasProps(...props) {
  return obj => {
    for (let p of props) {
      if (!_.hasIn(p, obj)) return new ValidateError(`has not prop [${p}]`);
    }
    return obj;
  }
}

export const isNumber = wrap(_.isNumber, 'should be a number')
export const isInt = wrap(_.isInteger, 'should be a number')

export const lt = rv => wrap(v => v < rv, `should be a lt ${rv}`)
export const gt = rv => wrap(v => v > rv, `should be a gt ${rv}`)

export function isValidateError(e) {
  return e instanceof ValidateError;
}

export function assertValue(err) {
  if (isValidateError(err)) throw err;
}
