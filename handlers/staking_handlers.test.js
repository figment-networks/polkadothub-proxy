const stakingHandlers = require('./staking_handlers');
const {createApi} = require('../tests/shared');

// These actually DO hit the API
describe('integration', () => {
  let call = {request: {height:  4128758}};

  describe('getByHeight', () => {
    it('returns a result that matches snapshot', async () => {
      expect(await stakingHandlers.getByHeight(await createApi(), call)).toMatchSnapshot();
    }, 300000); // these take a really long time, usually around 80s
  });
});
