import { getRequest } from './request';
import { ISendOptions } from './interfaces';

export * from './interfaces';
export {
  setConfiguration,
  validateSchema,
} from './utils';

export const route = {
  get: (path: string) => ({
    send: (opts: ISendOptions) => getRequest('GET', path, opts),
  }),
  post: (path: string) => ({
    send: (opts: ISendOptions) => getRequest('GET', path, opts),
  }),
  put: (path: string) => ({
    send: (opts: ISendOptions) => getRequest('GET', path, opts),
  }),
  patch: (path: string) => ({
    send: (opts: ISendOptions) => getRequest('GET', path, opts),
  }),
  delete: (path: string) => ({
    send: (opts: ISendOptions) => getRequest('GET', path, opts),
  }),
};
