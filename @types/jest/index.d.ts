/// <reference types="node" />

declare namespace jest {
  interface IErrorType {
    code: string;
    message: string;
  }

  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  interface Matchers<R> {
    toThrowApiError(status: number, error: IErrorType): Promise<R>;
    toMatchObjectInArray(obj: {}): R;
  }

  interface Expect {
    toThrowApiError: (status: number, error: IErrorType) => Promise<void>;
    toMatchObjectInArray: () => void;
  }
}
