export default class ValidateError extends Error {
  constructor(message, value, template) {
    super(message);
    this.reason = message;
    this.value = value;
    this.template = template;
    this.path = [];

    this.constructor = ValidateError;
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }

  get key() {
    return this.path.reduce(
      (k, p) => k + (typeof p === 'number' ? `[${p}]` : `.${p}`)
    );
  }

  get message() {
    const t = this.template || ValidateError.template;
    return t(this);
  }

  join(path) {
    this.path.unshift(path);
  }

  toJSON() {
    return {
      name: this.name,
      value: this.value,
      key: this.key,
      path: this.path,
      reason: this.reason,
      message: this.message
    };
  }
}

export function template(strings, ...keys) {
  return values =>
    keys.map((k, i) => strings[i] + values[k]).join('') + strings.pop();
}

export const T = template;

T.$name = 'name';
T.value = 'value';
T.key = 'key';
T.path = 'path';
T.reason = 'reason';

ValidateError.template = T`Value ${T.key}: ${T.reason}`;
