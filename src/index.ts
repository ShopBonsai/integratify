export * from './common/interfaces';
export { NUM_ERROR_CHECKS } from './utils/expect';

export { setGlobalConfig as setConfiguration } from './config/global';

// Export named & default main integratify function

export { integratify, integratify as default } from './integratify';
