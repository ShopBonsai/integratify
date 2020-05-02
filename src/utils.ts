import * as Joi from '@hapi/joi';

// Log requests during integration tests
const DEBUG_MODE_ENABLED = process.argv.includes('--debug');

export const log = (value: string): void => {
  if (DEBUG_MODE_ENABLED) console.debug(value);
};

/**
 * Validate data against a joi schema.
 */
export const validateSchema = <T>(data: T, schema: Joi.Schema) =>
  Joi.validate(data, schema, (err, value) => {
    if (err) throw err;
    if (!value) throw new Error('no value to check schema');
  });
