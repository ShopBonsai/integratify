import * as request from 'supertest';

import { IRequestType, IExpectOptions, ITestResponse } from './interfaces';
import { getConfiguration, log, validateSchema } from './utils';

// Number of expect for which errors are being tested to (see validateError function)
export const NUM_ERROR_CHECKS = 4;

/**
 * Validate request response with provided configuration
 */
export const expectRequest = async (type: IRequestType, req: request, opts: IExpectOptions & { payload?: string | object } = {})
  : Promise<ITestResponse> => {
  const { dataKey } = getConfiguration();
  const { status: httpStatus } = opts;

  // Execute actual request
  const { status, body, header } = await req;
  log(`Method: ${type}\nStatus: ${status}\nPayload:\n ${JSON.stringify(opts.payload, null, 2)}\nResponse:\n ${JSON.stringify(body, null, 2)}`);

  // Check HTTP status
  if (httpStatus) {
    expect(status).toEqual(httpStatus);
  }

  // Optional length
  if (opts.length) {
    expect(body[dataKey].length).toEqual(opts.length);
  }

  // Optional Joi schema validation
  if (opts.schema) {
    validateSchema(body, opts.schema);
  }

  // Optional data object match
  if (opts.matchObject) {
    expect(body[dataKey]).toMatchObject(opts.matchObject);
  }

  // Optional actual match
  if (opts.toEqual) {
    expect(body[dataKey]).toEqual(opts.toEqual);
  }

  // Optional object in array match
  if (opts.matchObjectInArray) {
    expect(body[dataKey]).toMatchObjectInArray(opts.matchObjectInArray);
  }

  // Check if spies have been called
  (opts.spies || []).forEach((spy) => {
    expect(spy).toHaveBeenCalledTimes(1);
  });

  // Optional pagination
  // TODO: Add flexible pagination support
  // if (opts.count) expect(body.meta.count).toEqual(opts.count);
  // if (opts.totalCount) expect(body.meta.totalCount).toEqual(opts.totalCount);

  // Optional error response
  // TODO: Add flexible errors support
  if (opts.error) {
    expect(body.errors[0].code).toEqual(opts.error.code);
  }

  return { status, body, header };
};
