const {setupApiAtHeight} = require('../utils/setup');
const eventMappers = require('../mappers/event/event_mappers');

/**
 * Get events by height
 */
const getByHeight = (api) => async (call, callback) => {
  const height = call.request.height;

  const {blockHash} = await setupApiAtHeight(api, height);

  const rawEventsAt = await api.query.system.events.at(blockHash);

  const events = [];
  rawEventsAt.forEach((rawEvent, index) => {
    events.push({
      index,
      ...eventMappers.toPb(rawEvent),
    });
  });

  callback(null, {events});
};

module.exports = {
  getByHeight,
};
