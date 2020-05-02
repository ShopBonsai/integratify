import * as Joi from '@hapi/joi';
import { Application } from 'express';

export type IRequestType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface IConfiguration {
  prefix?: string; // Url prefix
  dataPath?: string; // Key used for every response body containing data (needed for pagination results)
}

export interface ISendOptions {
  payload?: string | object;
  query?: string | object;
  headers?: object;
  file?: { name: string; value: any };
  config: IConfiguration;
  app: Application;
}

export type IExpectSpies = (jest.SpyInstance | { spy: jest.SpyInstance; amount: number })[];

export interface IExpectOptions {
  status?: number; // http status
  schema?: Joi.Schema;
  matchObject?: object;
  matchObjectInArray?: object;
  toEqual?: any;
  length?: number;
  spies?: IExpectSpies;
  error?: Error;
  paths?: { [path: string]: number }[];
  config: IConfiguration;
}

export interface ITestResponse {
  body: any;
  status: number;
  header: any;
}
