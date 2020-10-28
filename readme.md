# @lukeed/uuid ![CI](https://github.com/lukeed/uuid/workflows/CI/badge.svg) [![codecov](https://badgen.now.sh/codecov/c/github/lukeed/uuid)](https://codecov.io/gh/lukeed/uuid)

> A tiny (230B), [fast](#benchmarks), and cryptographically secure UUID (v4) generator for Node and the browser

***Node.js***

The Node.js module (235B) works in [all versions](https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback) of Node.js.

It is available in [ESM](https://unpkg.com/@lukeed/uuid/dist/index.mjs) and [CommonJS](https://unpkg.com/@lukeed/uuid/dist/index.js) formats, which means that both `import` and `require` syntax are supported.

***Browser***

The browser module (239B) works in all browsers with [`crypto.getRandomValues()` support](https://caniuse.com/#feat=getrandomvalues).

It is available in [UMD](https://unpkg.com/@lukeed/uuid) (under the `uuid` global) and [ESM](https://unpkg.com/@lukeed/uuid/dist/index.esm.js) formats. Any Rollup and webpack browser-configuration will select the correct file.


## Install

```
$ npm install --save @lukeed/uuid
```


## Usage

```js
import uuid from '@lukeed/uuid';

uuid(); //=> '400fa120-5e9f-411e-94bd-2a23f6695704'
uuid(); //=> 'cd6ffb4d-2eda-4c84-aef5-71eb360ac8c5'
uuid(); //=> '9d20a138-56e1-481a-b8d5-dafdb79f3d2d'
```


## API

### uuid()
Returns: `string`

Creates a new Version 4 (random) [RFC4122](http://www.ietf.org/rfc/rfc4122.txt) UUID.


## Benchmarks

> Running on Node.js v12.18.4

```
Validation:
  ✔ String.replace(Math.random)
  ✔ String.replace(crypto)
  ✔ uuid/v4
  ✔ @lukeed/uuid
  ✔ @lukeed/uuid/secure

Benchmark:
  String.replace(Math.random)  x    381,358 ops/sec ±0.31% (93 runs sampled)
  String.replace(crypto)       x     15,842 ops/sec ±1.16% (86 runs sampled)
  uuid/v4                      x  1,259,600 ops/sec ±0.45% (91 runs sampled)
  @lukeed/uuid                 x  6,384,840 ops/sec ±0.22% (95 runs sampled)
  @lukeed/uuid/secure          x  5,439,096 ops/sec ±0.23% (98 runs sampled)
```

## Performance

The reason why this UUID.V4 implementation is so much faster is two-fold:

1) It composes an output with hexadecimal pairs (from a cached dictionary) instead of single characters.
2) It allocates a larger Buffer/ArrayBuffer up front (expensive) and slices off chunks as needed (cheap).

The internal ArrayBuffer is 4096 bytes, which supplies **256** `uuid()` invocations.<br>A larger buffer would result in higher performance over time, but I found this to be a good balance of performance and memory space.

## License

MIT © [Luke Edwards](https://lukeed.com)
