import { IGlobalConfiguration } from '../common/interfaces';

let globalConfig: IGlobalConfiguration = {};

export const getGlobalConfig = (): IGlobalConfiguration => globalConfig;

export const setGlobalConfig = (values: IGlobalConfiguration) => {
  globalConfig = values;
};
