export function curry(fn) {
  return (...params) =>
    params.length < fn.length ? fn.bind(null, ...params) : fn(...params);
}

function baseCurryN(n, fn) {
  return (...params) =>
    n > 0 ? baseCurryN(n - 1, fn.bind(null, ...params)) : fn(...params);
}

export const curryN = curry(baseCurryN);

export const curry1 = curryN(1);
export const curry2 = curryN(2);
