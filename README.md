# Integratify

Make Node.js integration testing easy!

[![npm version](https://badge.fury.io/js/integratify.svg)](https://badge.fury.io/js/integratify)
[![Dependencies](https://david-dm.org/knor-el-snor/integratify.svg)](https://david-dm.org/knor-el-snor/integratify.svg)

## Installation

Install via npm

```shell
npm install integratify
```

or via yarn

```shell
yarn add integratify
```

## Usage

```javascript
const integratify = require('integratify');
```

```javascript
import * as integratify from 'integratify';
```

### Global configuration


### Initialize test runner

```typescript
const express = require('express');
const app = express();

const testRunner = integratify(app, {
  prefix: '/api/auth', // Optional prefix for every url path
  dataPath: 'data', // Optional path where actual data will be placed on.
});
```

### Run api tests

```typescript
describe('POST /login', () => {
  it('Should successfully log in existing user', async () => {
    const { status, header, body } = await testRunner
      .post("/login")
      .send({
        payload: { username, password }, // Optional body
        query: { ... }, // Optional query parameters
        headers: { ... }, // Optional headers
        file: { name: 'fileName.png', value: '...' }, // Optional file
      })
      .expect({
        status: 200,
        schema: loginOutsputSchema,
        matchObject: { username: expect.any(String)}
        matchObjectInArray:  { username: expect.any(String)},
        toEqual:  { username: expect.any(String)};
        length: 1,
        spies: [
          fetchSpy, // Will validate whether called once
          { spy: firebaseSpy, amount: 1 },
        ],
        error: new BadRequestError(errors.THIS_WAS_NOT_OK),
        paths: [
          { 'meta.count': 10 },
          { 'meta.totalCount': 250 },
        ]
      });
  });
});
```

> Error support for [tree-house-errors](https://github.com/icapps/tree-house-errors).

## Tests

You can run `npm run test` to run all tests
You can run `npm run test:coverage` to run all tests with coverage report

## Authors

See the list of [contributors](https://github.com/knor-el-snor/integratify/contributors) who participated in this project.

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details
