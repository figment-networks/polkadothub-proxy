const chainHandlers = require('./chain_handlers');
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
    it('returns head with appropriate keys', async () => {
      const response = await chainHandlers.getHead(api, call)
      const keys = Object.keys(response).sort();
      expect(keys).toEqual(['height', 'time', 'session', 'era'].sort());
    });
  });

  describe('getStatus', () => {
    it('returns status with appropriate keys', async () => {
      const response = await chainHandlers.getStatus(api, call)
      const keys = Object.keys(response).sort();
      expect(keys).toEqual(['chainName', 'chainType', 'clientInfo', 'genesisHash', 'nodeHealth', 'nodeLocalPeerUid', 'nodeName', 'nodeProperties', 'nodeRoles', 'nodeVersion'].sort());
    });
  });

  describe('getMetaByHeight', () => {
    call = {request: {height: 2003930}};
    it('returns a result that matches snapshot', async () => {
      expect(await chainHandlers.getMetaByHeight(api, call)).toMatchSnapshot();
    });
  });
});
