const validatorPerformanceHandlers = require('./validator_performance_handlers');
const {createApi} = require('../tests/shared');

// These actually DO hit the API
describe('integration', () => {
  let call = {request: {height: 4128758}};

  describe('getByHeight', () => {
    it('returns a result that matches snapshot', async () => {
      expect(await validatorPerformanceHandlers.getByHeight(await createApi(), call)).toMatchSnapshot();
    });
  });
});
