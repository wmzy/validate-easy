import {curry, curry1} from './util';
import ValidateError from './error';

// string

export function string(value) {
  if (typeof value === 'string') return value;
  throw new ValidateError('not a string', value);
}

export const length = curry(function length(len, value) {
  try {
    if (len === value.length) return value;
    // eslint-disable-next-line no-empty
  } catch (e) {}
  throw new ValidateError(`length not equal to ${len}`, value);
});

export const len = length;

export const match = curry(function match(reg, value) {
  if (reg.test(value)) return value;
  throw new ValidateError(`not match ${reg}`, value);
});

// object

export const required = curry1(function required(...keys) {
  const value = keys.pop();
  if (typeof value === 'object' && keys.every(k => value[k] !== undefined)) {
    return value;
  }
  throw new ValidateError(`required keys ${keys.join(', ')}`, value);
});

// number

export function isNumber(value) {
  if (typeof value === 'number') return value;
  throw new ValidateError(`not a number`, value);
}

export function isInteger(value) {
  if (Number.isInteger(value)) return value;
  throw new ValidateError(`not a number`, value);
}

export const lt = curry(function lt(right, value) {
  if (value < right) return value;
  throw new ValidateError('not lt', value);
});

export const gt = curry(function gt(right, value) {
  if (value > right) return value;
  throw new ValidateError('not gt', value);
});
