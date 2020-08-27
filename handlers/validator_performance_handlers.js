const {fetchMetadataAtHeight, injectMetadata} = require('../utils/setup');
const {InvalidArgumentError} = require('../utils/errors');

const IM_ONLINE_SECTION = 'imOnline'
const ALL_GOOD_EVENT_METHOD = 'AllGood'
const SOME_OFFLINE_EVENT_METHOD = 'SomeOffline'

/**
 * Get validator performance information by height
 */
const getByHeight = async (api, call, context = {}) => {
  const height = call.request.height;

  const currHeightMetadata = context.currHeightMetadata ? context.currHeightMetadata : await fetchMetadataAtHeight(api, height);
  injectMetadata(api, currHeightMetadata);

  const {blockHash} = currHeightMetadata;

  const eventsAt = await api.query.system.events.at(blockHash);

  let offlineValidatorsIds = [];
  const allGoodEvent = findEvent(eventsAt, IM_ONLINE_SECTION, ALL_GOOD_EVENT_METHOD);

  if (!allGoodEvent) {
    const someOfflineEvent = findEvent(eventsAt, IM_ONLINE_SECTION, SOME_OFFLINE_EVENT_METHOD);
    if (!someOfflineEvent) {
      throw new InvalidArgumentError(`No imOnline event was found at block height ${height}, is it last block in session?`)
    }
    offlineValidatorsIds = validatorIdsFromEvent(someOfflineEvent);
  }

  const validatorsAt = await api.query.session.validators.at(blockHash);
  const validatorsData = validatorsAt.map((validator) => ({
    stashAccount: validator.toString(),
    online: !offlineValidatorsIds.includes(validator.toString())
  }));

  return {validators: validatorsData};
};

const findEvent = (events, section, method) => (
  events.map(record => record.event).find((event) => {
    return event.section === section && event.method === method;
  })
);

const validatorIdsFromEvent = (event) => (event.data[0].map((offlineData) => offlineData[0].toString()));

module.exports = {
  getByHeight,
};
