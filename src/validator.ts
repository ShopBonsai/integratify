import * as Joi from '@hapi/joi';
import { isApiError } from '@icapps/tree-house-errors';
import * as _ from 'lodash';

import { IExpectSpies } from './interfaces';

/**
 * Validate data against a joi schema.
 */
export const validateSchema = <T>(data: T, schema: Joi.Schema) =>
  Joi.validate(data, schema, (err, value) => {
    if (err) throw err;
    if (!value) throw new Error('no value to check schema');
  });

/**
 * Validate whether http status matches.
 * @param {number} status - Http status response.
 * @param {number} expectedStatus - Expected http status.
 */
export const validateHttpStatus = (status: number, expectedStatus: number | undefined) =>
  expectedStatus ? expect(status).toEqual(expectedStatus) : null;

/**
 * Validate whether output matches Joi Schema.
 * @param values - Response values.
 * @param {object} expectedSchema - Joi schema.
 */
export const validateOutputSchema = <T>(values: T, expectedSchema: Joi.Schema | undefined) =>
  expectedSchema ? validateSchema(values, expectedSchema) : null;

/**
 * Validate whether output has specified length.
 * @param values - Response values.
 * @param {object} length - Length to match.
 * @param {string} [dataPath] - Optional data path.
 */
export const validateOutputLength = <T>(values: T, length: number | undefined, dataPath?: string) => {
  if (length) {
    return dataPath ? expect(values[dataPath]).toHaveLength(length) : expect(values).toHaveLength(length);
  }
};

/**
 * Validate whether output matches object.
 * @param values - Response values.
 * @param {object} matchObject - Object to match.
 * @param {string} [dataPath] - Optional data path.
 */
export const validateOutputMatch = <T>(values: T, matchObject: object | undefined, dataPath?: string) => {
  if (matchObject) {
    return dataPath ? expect(values[dataPath]).toMatchObject(matchObject) : expect(values).toMatchObject(matchObject);
  }
};

/**
 * Validate whether output equals object.
 * @param values - Response values.
 * @param {object} toEqual - Object to equal.
 * @param {string} [dataPath] - Optional data path.
 */
export const validateOutputEqual = <T>(values: T, toEqual: object | undefined, dataPath?: string) => {
  if (toEqual) {
    return dataPath ? expect(values[dataPath]).toEqual(toEqual) : expect(values).toEqual(toEqual);
  }
};

/**
 * Validate whether output matches object within array.
 * @param values - Response values.
 * @param {object} matchObjectInArray - Object to match within array.
 * @param {string} [dataPath] - Optional data path.
 */
export const validateOutputMatchArray = <T>(values: T, matchObjectInArray: object | undefined, dataPath?: string) => {
  if (matchObjectInArray) {
    return dataPath
      ? expect(values[dataPath]).toMatchObjectInArray(matchObjectInArray)
      : expect(values).toMatchObjectInArray(matchObjectInArray);
  }
};

/**
 * Validate whether spies have been called.
 * @param {object[]} spies - List of spies.
 */
export const validateSpies = (spies: IExpectSpies = []) => {
  spies.map(x => {
    if (_.get(x, 'spy') && _.get(x, 'amount')) {
      const { spy, amount } = x as any;
      expect(spy).toHaveBeenCalledTimes(amount);
    }
    expect(x).toHaveBeenCalledTimes(1);
  });
};

/**
 * Validate whether error is being returned.
 * @param values - Response values.
 * @param {object} error - Error object.
 */
export const validateError = <T>(values: T, error: Error | undefined) => {
  if (error) {
    if (isApiError(error)) return expect(values['errors'][0].code).toEqual(error.code);
    return expect(values).toEqual(error);
  }
};

/**
 * Validate whether specific paths match within response.
 * @param values - Response values.
 * @param {object[]} paths - List of path objects.
 */
export const validatePaths = <T>(values: T, paths: { [path: string]: any } = {}) => {
  Object.keys(paths).map(key => {
    expect(_.get(values, key)).toEqual(paths[key]);
  });
};
