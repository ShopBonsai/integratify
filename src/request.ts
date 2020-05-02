import * as request from 'supertest';

import { expectRequest } from './expect';
import { IRequestType, ITestResponse, ISendOptions, IExpectOptions } from './interfaces';

/**
 * Set properties onto request object.
 * @param {object} req - Supertest Request.
 * @param {string} type - Request type (GET, POST, PUT, DELETE).
 * @param {object} opts - Request options.
 */
export const setReqProps = (req: request.Request, type: IRequestType, opts: ISendOptions): void => {
  const { headers, payload, file, query } = opts;

  // Optional headers
  if (headers) {
    req.set(headers);
  }

  // Optional payload/body
  if (type !== 'GET' && payload) {
    req.send(payload);
  }

  // Optional file
  if (file) {
    req.attach(file.name, file.value);
  }

  // Optional query parameters
  if (query) {
    req.query(query);
  }
};

/**
 * Returns expect function with created request.
 * @param {string} type - Request type (GET, POST, PUT, DELETE).
 * @param {string} path - Query path including first slash.
 * @param {object} opts - Request options.
 */
export const getRequest = (
  type: IRequestType,
  path: string,
  opts: ISendOptions,
): { expect: (opts: IExpectOptions) => Promise<ITestResponse> } => {
  const {
    app,
    config: { prefix = '' },
  } = opts;
  const req: request.Request = request(app)[type.toLowerCase()](`${prefix}${path}`);

  // Set default to accept Application/json
  req.set('Accept', 'application/json');

  // Set properties onto request
  setReqProps(req, type, opts);

  return {
    expect: (options: IExpectOptions) => expectRequest(type, req, { ...opts, ...options }),
  };
};
