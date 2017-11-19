import v, * as methods from './validate';

for (let m in methods) {
  if (v[m]) throw new Error(`method [${m}] should not be overwritten!`);
  v[m] = methods[m];
}

export default v;
