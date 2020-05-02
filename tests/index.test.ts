import * as express from 'express';

import { integratify2 } from '../src';

const app = express();

describe('', () => {
  it('', () => {
    const testRunner = integratify2(app, { prefix: '/auth' });

    testRunner.post('/test/petmans');
    testRunner.post()
  });
});
