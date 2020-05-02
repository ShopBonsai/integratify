import * as Joi from '@hapi/joi';

import { IGlobalConfiguration } from './interfaces';

// Keep some global configuration
const globalConfiguration: IGlobalConfiguration = {
  app: null,
  dataKey: 'data',
};

/**
 * Set global configuration
 * Needs to happen before running tests.
 * @param options
 */
export const setConfiguration = (options: IGlobalConfiguration) => {
  Object.assign(globalConfiguration, options);
};

/**
 * Get global configuration.
 */
export const getConfiguration = () => globalConfiguration;

// Log requests during integration tests
const DEBUG_MODE_ENABLED = process.argv.includes('--debug');

export const log = (value: string): void => {
  if (DEBUG_MODE_ENABLED) console.debug(value);
};

/**
 * Validate data against a joi schema.
 */
export const validateSchema = (data: any, schema: Joi.Schema) =>
  Joi.validate(data, schema, (err, value) => {
    if (err) throw err;
    if (!value) throw new Error('no value to check schema');
  });
