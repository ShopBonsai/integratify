export type IRequestType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Custom schema validator
export type ISchemaValidator = <T>(data: T, schema: any) => void;

// Global configuration
export interface IGlobalConfiguration {
  dataPath?: string; // Key used for every response body containing data (needed for pagination results)
  schemaValidator?: ISchemaValidator;
}

// Configuration per runner instance
export interface IConfiguration {
  prefix?: string; // Url prefix
  dataPath?: string; // Key used for every response body containing data (needed for pagination results)
  schemaValidator?: ISchemaValidator;
}

export interface ISendOptions {
  payload?: string | object;
  query?: string | object;
  headers?: object;
  file?: { name: string; value: any };
}

export type IExpectSpies = (jest.SpyInstance | { spy: jest.SpyInstance; amount: number })[];

export interface IExpectOptions {
  status?: number;
  schema?: any;
  matchObject?: object;
  matchObjectInArray?: object;
  toEqual?: any;
  length?: number;
  spies?: IExpectSpies;
  error?: Error;
  paths?: { [path: string]: any };
}

export interface ITestResponse {
  body: any;
  status: number;
  header: any;
}
