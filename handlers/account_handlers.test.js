const accountHandlers = require('./account_handlers');
const {createApi} = require('../tests/shared');

// These actually DO hit the API
describe('integration', () => {
  let call = {request: {height: 2003930, address: 'DSpbbk6HKKyS78c4KDLSxCetqbwnsemv2iocVXwNe2FAvWC'}};
  let api;

  beforeAll(async (done) => {
    api = await createApi();
    done()
  });

  describe('getIdentity', () => {
    call = {request: {address: 'DSpbbk6HKKyS78c4KDLSxCetqbwnsemv2iocVXwNe2FAvWC'}};

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
