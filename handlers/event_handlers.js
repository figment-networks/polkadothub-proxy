const {getHashForHeight} = require('../utils/block');
const eventMappers = require('../mappers/event/event_mappers');
const {rollbar} = require('../utils/rollbar');

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
      error: getError(api, call, rawEvent),
      ...eventMappers.toPb(rawEvent),
    });
  });

  return {events};
};

function getError(api, call, rawEvent) {
  let errMsg;
  rawEvent.event.data.forEach((data) => {
    if (data.isModule) {
      const module = data.asModule;
      try {
        const { documentation } = api.registry.findMetaError(module);
        if ( Array.isArray(documentation) && documentation.length > 0) {
          errMsg = documentation[0];
        }
      } catch (error) {
        rollbar.error(error, {call})
        if (moduleHasIndexAndError(module)) {
          errMsg = `{"index":${data.asModule.index.words[0]},"error":${data.asModule.error.words[0]}}`;
        } 
      }
    }
  })
  return errMsg;
}

function moduleHasIndexAndError(module) {
  return module && module.index && module.error && module.index.words && module.error.words &&
  Array.isArray(module.index.words) && module.index.length > 0 && Array.isArray(module.error.words) && module.error.length > 0
}

module.exports = {
  getByHeight,
};
