import { validateHttpStatus } from '../validator';

describe('validator', () => {
  describe('validateHttpStatus', () => {
    it('Should equal http status', () => {
      validateHttpStatus(200, 200);
    });
  });
});
