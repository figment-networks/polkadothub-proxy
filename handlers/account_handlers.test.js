const accountHandlers = require('./account_handlers');
const {createApi} = require('../tests/shared');

// These actually DO hit the API
describe('integration', () => {
  let call = {request: {height: 2003930, address: '12mP4sjCfKbDyMRAEyLpkeHeoYtS5USY4x34n9NMwQrcEyoh'}};
  let api;

  beforeAll(async (done) => {
    api = await createApi();
    done()
  });

  describe('getIdentity', () => {
    call = {request: {address: '12mP4sjCfKbDyMRAEyLpkeHeoYtS5USY4x34n9NMwQrcEyoh'}};

    it('returns a result that matches snapshot', async () => {
      expect(await accountHandlers.getIdentity(api, call)).toMatchSnapshot();
    });
  });

  describe('getByHeight', () => {
    it('returns a result that matches snapshot', async () => {
      expect(await accountHandlers.getByHeight(api, call)).toMatchSnapshot();
    });
  });
});
