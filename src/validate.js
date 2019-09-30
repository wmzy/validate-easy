import ValidateError from './error';

function throwWith(e, key, value) {
  if (e instanceof ValidateError) {
    e.join(key);
    e.value = value;
  }
  throw e;
}

export function validate(...fns) {
  return value => fns.reduce((value, fn) => fn(value), value);
}

export const v = validate;

export function validateCatch(...fns) {
  const catcher = fns.pop();
  return value => {
    try {
      return validate(...fns)(value);
    } catch (e) {
      return catcher(e);
    }
  };
}

export const vc = validateCatch;

export function validateOr(...fns) {
  const or = fns.pop();
  return validateCatch(...fns, () => or);
}

export const vo = validateOr;

export function validateOrThrow(...fns) {
  const template = fns.pop();
  return validateCatch(...fns, e => {
    e.template = template;
    throw e;
  });
}

export const vot = validateOrThrow;

export function prop(key) {
  return (...fns) => value => {
    try {
      return {
        ...value,
        [key]: validate(...fns)(value[key])
      };
    } catch (e) {
      return throwWith(e, key, value);
    }
  };
}

export const p = prop;

export function optionalProp(key) {
  return (...fns) => value => {
    if (key in value) {
      return prop(key)(...fns)(value);
    }
    return value;
  };
}

export const op = optionalProp;

export function every(...fns) {
  return values => {
    if (!Array.isArray(values)) return values;
    return values.map((value, index) => {
      try {
        return validate(...fns)(value);
      } catch (e) {
        return throwWith(e, index, value);
      }
    });
  };
}

export function wrap(fn, message) {
  return v => {
    if (fn(v)) return v;
    return new ValidateError(message);
  };
}
