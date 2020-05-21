const stakingHandlers = require('./staking_handlers');
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
      expect(await stakingHandlers.getByHeight(api, call)).toMatchSnapshot();
    }, 110000); // these take a really long time, usually around 80s
  });
});
