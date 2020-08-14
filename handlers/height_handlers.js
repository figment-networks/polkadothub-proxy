const chainHandlers = require('./chain_handlers');
const blockHandlers = require('./block_handlers');
const stakingHandlers = require('./staking_handlers');
const validatorPerformanceHandlers = require('./validator_performance_handlers');
const eventHandlers = require('./event_handlers');
const {InvalidArgumentError} = require('../utils/errors');
const {fetchMetadataAtHeight} = require('../utils/setup');

/**
 * Get all data by height
 */
const getAll = async (api, call, context) => {
  const height = call.request.height;

  // Decorate context with current and previous height data
  context.currHeightMetadata = await fetchMetadataAtHeight(api, height);
  context.prevHeightMetadata = await fetchMetadataAtHeight(api, height - 1);

  const chainResp = await chainHandlers.getMetaByHeight(api, call, context);
  const blockResp = await blockHandlers.getByHeight(api, call, context);
  const eventResp = await eventHandlers.getByHeight(api, call, context);

  let stakingResp;
  let validatorPerformanceResp;
  try {
    stakingResp = await stakingHandlers.getByHeight(api, call, context);
    validatorPerformanceResp = await validatorPerformanceHandlers.getByHeight(api, call, context);
  } catch (err) {
    if (err instanceof InvalidArgumentError) {
      // Data not available for given height, do nothing
    } else {
      throw err;
    }
  }

  return {
    chain: chainResp,
    block: blockResp,
    staking: stakingResp,
    validatorPerformance: validatorPerformanceResp,
    event: eventResp,
  };
};

module.exports = {
  getAll,
};
