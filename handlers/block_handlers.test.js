const blockHandlers = require('./block_handlers');
const {createApi} = require('../tests/shared');

// These actually DO hit the API
describe('integration', () => {
  let call = {request: {height: 2003930}};
  let api;

  beforeAll(async (done) => {
    api = await createApi();
    done()
  });

  describe('getByHeight', () => {
    it('returns a result that matches snapshot', async () => {
      expect(await blockHandlers.getByHeight(api, call)).toMatchSnapshot();
    });
  });

});
