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

  describe('getHead', () => {
    call = {request: {}}
    it('returns head', async () => {
      const response = await blockHandlers.getHead(api, call)
      const keys = Object.keys(response).sort();
      expect(keys).toEqual(['height', 'time', 'session', 'era'].sort());
    });
  });

  describe('getByHeight', () => {
    it('returns a block that matches snapshot', async () => {
      expect(await blockHandlers.getByHeight(api, call)).toMatchSnapshot();
    });
  });

  describe('getMetaByHeight', () => {
    it('returns meta that matches snapshot', async () => {
      expect(await blockHandlers.getMetaByHeight(api, call)).toMatchSnapshot();
    });
  });
});
