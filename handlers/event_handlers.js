const {fetchMetadataAtHeight, injectMetadata} = require('../utils/setup');
const eventMappers = require('../mappers/event/event_mappers');

/**
 * Get events by height
 */
const getByHeight = async (api, call, context) => {
  const height = call.request.height;

  const currHeightMetadata = context.currHeightMetadata ? context.currHeightMetadata : await fetchMetadataAtHeight(api, height);
  injectMetadata(api, currHeightMetadata);

  const {blockHash} = currHeightMetadata;

  const rawEventsAt = await api.query.system.events.at(blockHash);

  const events = [];
  rawEventsAt.forEach((rawEvent, index) => {
    events.push({
      index,
      ...eventMappers.toPb(rawEvent),
    });
  });

  return {events};
};

module.exports = {
  getByHeight,
};
