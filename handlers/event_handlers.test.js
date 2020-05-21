const eventHandlers = require('./event_handlers');
const {createApi} = require('../tests/shared');

// These actually DO hit the API
describe('integration', () => {
  let call = {request: {height: 2197577}};

  describe('getByHeight', () => {
    it('returns a result that matches snapshot', async () => {
      expect(await eventHandlers.getByHeight(await createApi(), call)).toMatchSnapshot();
    });
  });
});
