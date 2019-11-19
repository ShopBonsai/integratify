import * as request from 'supertest';

import { IRequestType, ITestResponse, ISendOptions, IExpectOptions } from './interfaces';
import { getConfiguration } from './utils';
import { expectRequest } from './expect';

/**
 * Returns expect function with created request
 */
export const getRequest = (type: IRequestType, path: string, opts: ISendOptions = {})
  : { expect: (opts: IExpectOptions) => Promise<ITestResponse> } => {
  const { app } = getConfiguration();

  const req = (request(app) as any)[type.toLowerCase()](path)
    .set('Accept', 'application/json');

  // Optional payload/body
  if (type !== 'GET' && opts.payload) {
    req.send(opts.payload);
  }

  // Optional headers
  if (opts.headers) {
    req.set(opts.headers);
  }

  // Optional file
  if (opts.file) {
    req.attach(opts.file.name, opts.file.value);
  }

  // Optional query parameters
  if (opts.query) {
    req.query(opts.query);
  }

  return {
    expect: (opts: IExpectOptions) => expectRequest(type, req, opts),
  };
};
