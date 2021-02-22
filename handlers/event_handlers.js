const {getHashForHeight} = require('../utils/block');
const eventMappers = require('../mappers/event/event_mappers');

/**
 * Get events by height
 */
const getByHeight = async (api, call, context = {}) => {
  const blockHash = context.blockHash ? context.blockHash : await getHashForHeight(api, call.request.height);
  const rawEventsAt = await api.query.system.events.at(blockHash);

  const events = [];
  rawEventsAt.forEach((rawEvent, index) => {
    events.push({
      index,
      error: getError(api, rawEvent),
      ...eventMappers.toPb(rawEvent),
    });
  });

  return {events};
};

function getError(api, rawEvent) {
  let errMsg;
  rawEvent.event.data.forEach((data) => {
    if (data.isModule) {
      const { documentation } = api.registry.findMetaError(data.asModule);
      if ( Array.isArray(documentation) && documentation.length > 0) {
        errMsg = documentation[0];
      }
    }
  })
  return errMsg;
}

module.exports = {
  getByHeight,
};
