import * as Joi from '@hapi/joi';

export type IRequestType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface IGlobalConfiguration {
  app: any; // TODO: Express application
  dataKey: string; // Key used for every response body containing data
}

export interface ISendOptions {
  payload?: string | object;
  query?: string | object;
  headers?: object;
  file?: { name: string; value: any };
}

export interface IExpectOptions {
  status?: number; // http status
  schema?: Joi.Schema;
  matchObject?: object;
  matchObjectInArray?: object;
  toEqual?: any;
  length?: number;
  spies?: jest.SpyInstance[];
  error?: any;
}

export interface ITestResponse {
  body: any;
  status: number;
  header: any;
}
