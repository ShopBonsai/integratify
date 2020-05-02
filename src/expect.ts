import { Request } from 'supertest';

import { IRequestType, IExpectOptions, ITestResponse, IConfiguration } from './interfaces';
import { log } from './utils';
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
 * Log request for debugging purposes.
 * @param {object} values - Request values needed for logging.
 * @param {string} values.type - Request type (GET, POST, PUT, DELETE).
 * @param values.payload - Request payload.
 * @param values.body - Request response body.
 */
export const logRequest = ({ type, payload, body }: { type: IRequestType; payload: any; body: any }) => {
  log(
    `Method: ${type}\nStatus: ${status}\nPayload:\n ${JSON.stringify(payload, null, 2)}\nResponse:\n ${JSON.stringify(
      body,
      null,
      2,
    )}`,
  );
};

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
  logRequest({ type, payload, body });

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
