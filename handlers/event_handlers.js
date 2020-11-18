const {getHashForHeight} = require('../utils/block');
const eventMappers = require('../mappers/event/event_mappers');

/**
 * Get events by height
 */
const getByHeight = async (api, call, context = {}) => {
  const blockHash = await getHashForHeight(api, call.request.height);
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
