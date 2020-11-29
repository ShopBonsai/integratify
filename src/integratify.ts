import { Application } from 'express';

import { ISendOptions, IConfiguration } from './common/interfaces';
import { getRequest } from './utils/request';

/**
 * Main entrance point functionality to run tests.
 * @param {object} app - Express application.
 * @param {object} config - Test runner configuration.
 */
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
