import { validateHttpStatus } from '../validator';

describe('Utils - validator', () => {
  describe('validateHttpStatus', () => {
    it('Should equal http status', () => {
      validateHttpStatus(200, 200);
    });
  });
});
