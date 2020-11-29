import { integratify } from './integratify';

export * from './common/interfaces';
export { validateSchema } from './utils/validator';
export { NUM_ERROR_CHECKS } from './utils/expect';

// Export named & default main integratify function
export { integratify };
export default integratify;
