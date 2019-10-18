import * as Joi from '@hapi/joi';
import * as request from 'supertest';
import { IIntegrationOptions, IRequestType, ITestResponse, IGlobalConfiguration } from './interfaces';

// Keep some global configuration
const globalConfiguration: IGlobalConfiguration = {
  app: null,
  dataKey: 'data',
};

/**
 * Set global configuration
 * Needs to happen before running tests
 * @param options
 */
export const setConfiguration = (options: IGlobalConfiguration) => {
  Object.assign(globalConfiguration, options);
};

// Log requests during integration tests
const DEBUG_MODE_ENABLED = process.argv.includes('--debug');

export const log = (value: string): void => {
  if (DEBUG_MODE_ENABLED) console.debug(value);
};

// Number of expect for which errors are being tested to (see validateError function)
export const NUM_ERROR_CHECKS = 4;

/**
 * Validate data against a joi schema
 */
export const validateSchema = (data: any, schema: Joi.Schema) => Joi.validate(data, schema, (err, value) => {
  if (err) throw err;
  if (!value) throw new Error('no value to check schema');
});

/**
 * Test a specific integration route
 * @param {String} type
 * @param {String} path
 * @param {Number} httpStatus
 * @param {Object} options
 */
export const runRouteValidation =
  async (type: IRequestType, path: string, options: IIntegrationOptions = {}): Promise<ITestResponse> => {
    const { app, dataKey } = globalConfiguration;
    const { status: httpStatus } = options;

    const req = (request(app) as any)[type.toLowerCase()](path)
      .set('Accept', 'application/json');

    // Optional payload/body
    if (type !== 'GET' && options.payload) {
      req.send(options.payload);
    }

    // Optional headers
    if (options.headers) {
      req.set(options.headers);
    }

    // Optional file
    if (options.file) {
      req.attach(options.file.name, options.file.value);
    }

    // Optional query parameters
    if (options.query) {
      req.query(options.query);
    }

    // Execute actual request
    const { status, body, header } = await req;
    log(`Method: ${type}\nStatus: ${status}\nPayload:\n ${JSON.stringify(options.payload, null, 2)}\nResponse:\n ${JSON.stringify(body, null, 2)}`);

    // Check HTTP status
    expect(status).toEqual(httpStatus);

    // Optional length
    if (options.length) {
      expect(body[dataKey].length).toEqual(options.length);
    }

    // Optional Joi schema validation
    if (options.schema) {
      validateSchema(body, options.schema);
    }

    // Optional data object match
    if (options.matchObject) {
      expect(body[dataKey]).toMatchObject(options.matchObject);
    }

    // Optional actual match
    if (options.toEqual) {
      expect(body[dataKey]).toEqual(options.toEqual);
    }

    // Optional object in array match
    if (options.matchObjectInArray) {
      expect(body[dataKey]).toMatchObjectInArray(options.matchObjectInArray);
    }

    // Check if spies have been called
    (options.spies || []).forEach((spy) => {
      expect(spy).toHaveBeenCalledTimes(1);
    });

    // Optional pagination
    // TODO: Add flexible pagination support
    // if (options.count) expect(body.meta.count).toEqual(options.count);
    // if (options.totalCount) expect(body.meta.totalCount).toEqual(options.totalCount);

    // Optional error response
    // TODO: Add flexible errors support
    if (options.error) {
      expect(body.errors[0].code).toEqual(options.error.code);
    }

    return { status, body, header };
  };

/**
 * Wrapper function for running route integration test validation
 * TODO: Cleanup below into easier function
 */

// TODO: Add chaining for input and output (.input(...) & .output(...))
export const testRoute = (path: string) => ({
  get: (options: IIntegrationOptions = {}) => runRouteValidation('GET', path, options),
  post: (options: IIntegrationOptions = {}) => runRouteValidation('POST', path, options),
  put: (options: IIntegrationOptions = {}) => runRouteValidation('PUT', path, options),
  patch: (options: IIntegrationOptions = {}) => runRouteValidation('PATCH', path, options),
  delete: (options: IIntegrationOptions = {}) => runRouteValidation('DELETE', path, options),
});
