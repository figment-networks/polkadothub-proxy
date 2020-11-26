const transactionHandlers = require('./transaction_handlers');
const {createApi} = require('../tests/shared');

// These actually DO hit the API
describe('integration', () => {
  let call = {request: {height: 2197580}};
  let api;

  beforeAll(async (done) => {
    api = await createApi();
    done()
  });

  describe('getByHeight', () => {
    it('returns a result that matches snapshot', async () => {
      expect(await transactionHandlers.getByHeight(api, call)).toMatchSnapshot();
    });
  });
});
