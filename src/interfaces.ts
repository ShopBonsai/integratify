import * as Joi from '@hapi/joi';

export type IRequestType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface IGlobalConfiguration {
  app: any; // TODO: Express application
  dataKey: string; // Key used for every response body containing data
}

export interface IIntegrationOptions {
  status?: number; // http status
  schema?: Joi.Schema;
  matchObject?: object;
  matchObjectInArray?: object;
  toEqual?: any;
  payload?: string | object;
  query?: string | object;
  headers?: object;
  length?: number;
  spies?: jest.SpyInstance[];
  error?: any;
  file?: { name: string, value: any };

  // pagination properties
  // count?: number;
  // totalCount?: number;
}

export interface ITestResponse {
  body: any;
  status: number;
  header: any;
}
