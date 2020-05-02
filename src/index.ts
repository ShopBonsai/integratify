import { Application } from 'express';

import { ISendOptions, IConfiguration } from './interfaces';
import { getRequest } from './request';

export * from './interfaces';
export { validateSchema } from './validator';
export { NUM_ERROR_CHECKS } from './expect';

export const integratify = (app: Application, config: IConfiguration = {}) => ({
  get: (path: string) => ({
    send: (opts?: ISendOptions) => getRequest('GET', path, { ...opts, app, config }),
  }),
  post: (path: string) => ({
    send: (opts?: ISendOptions) => getRequest('POST', path, { ...opts, app, config }),
  }),
  put: (path: string) => ({
    send: (opts?: ISendOptions) => getRequest('PUT', path, { ...opts, app, config }),
  }),
  patch: (path: string) => ({
    send: (opts?: ISendOptions) => getRequest('PATCH', path, { ...opts, app, config }),
  }),
  delete: (path: string) => ({
    send: (opts?: ISendOptions) => getRequest('DELETE', path, { ...opts, app, config }),
  }),
});

export default integratify;
