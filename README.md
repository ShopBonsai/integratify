# Integratify

Make Node.js integration testing easy!

[![npm version](https://badge.fury.io/js/integratify.svg)](https://badge.fury.io/js/integratify)
[![Dependencies](https://david-dm.org/knor-el-snor/integratify.svg)](https://david-dm.org/knor-el-snor/integratify.svg)
![API Continuous Integration](https://github.com/ShopBonsai/integratify/workflows/API%20Continuous%20Integration/badge.svg)

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

## Configuration

### Global

You can set a global configuration that will used for all tests. Adviced to set this in a configuration file running before each test file. This is **optional**

```typescript
import { setConfiguration } from 'integratify';

setConfiguration({
  dataPath: 'data',
  schemaValidator: (data, schema) => myValidationFunc(data, schema),
});
```

### Local

You can always overwrite any global configuration per test suite when initializing your Integratify test runner.

```typescript
const express = require('express');
const app = express();

const testRunner = integratify(app, {
  prefix: '/api/auth', // Optional prefix for every url path
  dataPath: 'data', // Optional path where actual data will be placed on.
  schemaValidator: (data, schema) => myValidationFunc(data, schema), // Function to validate data against a schema
});
```

## Getting Started

### Run api tests

```typescript
// test.config.ts
import { setConfiguration } from 'integratify';

setConfiguration({
  dataPath: 'data',
  schemaValidator: (data, schema) => myValidationFunc(data, schema),
});


// login.test.ts
const testRunner = integratify(app, {
  prefix: '/auth',
  dataPath: 'customDataPath', // Will overwrite global setting
});

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

Available Options

`.post` `.get` `.put` `.patch` `.delete`

| Key     | Type          | Description    | Allowed value(s)               |
| ------- | ------------- | -------------- | ------------------------------ |
| payload | string/object | Body payload   | any string/object              |
| query   | string/object | Query payload  | any string/object              |
| headers | object        | Custom headers | any object                     |
| file    | object        | File payload   | `{ name: string, value: any }` |

`.expect`

| Key                | Type   | Description                                    | Allowed value(s)                                             |
| ------------------ | ------ | ---------------------------------------------- | ------------------------------------------------------------ |
| status             | number | HTTP status                                    | valid HTTP status code                                       |
| schema             | any    | Validation schema                              | Expected schema for `schemaValidator` configuration property |
| matchObject        | object | `.toMatchObject`                               | any object                                                   |
| matchObjectInArray | object | Matches an object within an array              | any object                                                   |
| toEqual            | any    | `.toEqual`                                     | any                                                          |
| length             | number | Matches length of response                     | number                                                       |
| spies              | object | Checks whether specific spies got called       | `[mySpy]` or `[{ spy: mySpy, amount: 2 }]`                   |
| error              | Error  | Potential error to validate against            | Javascript Error                                             |
| paths              | object | Validate custom return keys besides `dataPath` | `{'meta.count': 1}`                                          |

> Error support for [@tree-house/errors](https://github.com/ShopBonsai/tree-house/tree/master/packages/errors).

## To Do

Unfortunately no time could be found yet to add automated tests. This is the first thing planned now we have a stable version 3 released.

## Tests

You can run `npm run test` to run all tests
You can run `npm run test:coverage` to run all tests with coverage report

## Authors

See the list of [contributors](https://github.com/ShopBonsai/integratify/contributors) who participated in this project.

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details
