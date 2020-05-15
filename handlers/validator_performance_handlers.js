const {setupApiAtHeight} = require('../utils/setup');
const SOME_OFFLINE_EVENT_SECTION = 'imOnline'
const SOME_OFFLINE_EVENT_METHOD = 'SomeOffline'

/**
 * Get validator performance information by height
 */
const getByHeight = (api) => async (call, callback) => {
  const height = call.request.height;
  const {blockHash} = await setupApiAtHeight(api, height);

  const eventsAt = await api.query.system.events.at(blockHash);
  const someOfflineEvent = eventsAt.map(record => record.event).find((event) => {
    return event.section === SOME_OFFLINE_EVENT_SECTION && event.method === SOME_OFFLINE_EVENT_METHOD;
  })

  if (!someOfflineEvent) {
    throw new Error(`No SomeOffline event was found at block height ${height}, is it last block in session?`)
  }

  const offlineValidatorsIds = validatorIdsFromEvent(someOfflineEvent);

  const validatorsAt = await api.query.session.validators.at(blockHash);
  const validatorsData = validatorsAt.map((validator) => ({
    controllerAccount: validator.toString(),
    online: !offlineValidatorsIds.includes(validator.toString())
  }));

  const response = {validators: validatorsData};
  callback(null, response);
};

const validatorIdsFromEvent = (event) => (event.data[0].map((offlineData) => offlineData[0].toString()));

module.exports = {
  getByHeight,
};
