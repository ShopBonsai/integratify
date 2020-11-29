import { Request } from 'supertest';

import { IRequestType, IExpectOptions, ITestResponse, IConfiguration } from '../common/interfaces';
import { logRequest } from './logger';
import {
  validateHttpStatus,
  validateOutputSchema,
  validateOutputMatch,
  validateOutputEqual,
  validateOutputMatchArray,
  validateOutputLength,
  validateSpies,
  validateError,
  validatePaths,
} from './validator';

// Number of expect for which errors are being tested to (see validateError function)
export const NUM_ERROR_CHECKS = 4;

/**
 * Validate request response with provided configuration.
 * @param {string} type - Request type (GET, POST, PUT, DELETE).
 * @param {object} req - Supertest request object.
 * @param {object} opts - Options describing what to expect.
 */
export const expectRequest = async (
  type: IRequestType,
  req: Request,
  opts: IExpectOptions & { payload?: string | object; config: IConfiguration },
): Promise<ITestResponse> => {
  const {
    status: expectedStatus,
    payload,
    length,
    schema,
    matchObject,
    matchObjectInArray,
    toEqual,
    spies,
    error,
    paths,
    config: { dataPath } = {},
  } = opts;

  // Execute actual request
  const { status, body, header } = await req;

  // Add logs
  logRequest({ type, payload, body, status });

  // Run validation
  validateHttpStatus(status, expectedStatus);
  validateOutputLength(body, length, dataPath);
  validateOutputSchema(body, schema);
  validateOutputEqual(body, toEqual, dataPath);
  validateOutputMatch(body, matchObject, dataPath);
  validateOutputMatchArray(body, matchObjectInArray, dataPath);
  validatePaths(body, paths);
  validateError(body, error);
  validateSpies(spies);

  // Return request results
  return { status, body, header };
};
