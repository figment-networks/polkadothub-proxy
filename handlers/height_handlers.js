

const chainHandlers = require('./chain_handlers');
const blockHandlers = require('./block_handlers');
const stakingHandlers = require('./staking_handlers');
const validatorPerformanceHandlers = require('./validator_performance_handlers');
const transactionHandlers = require('./transaction_handlers');
const eventHandlers = require('./event_handlers');
const {InvalidArgumentError} = require('../utils/errors');
const {getHashForHeight} = require('../utils/block');

const {callDurationHistogram,calculateTime} = require('./metrics')

/**
 * Get all data by height
 */
const getAll = async (api, call, context) => {
  const height = call.request.height;

  // Decorate context with current and previous height data

  const hrstart = process.hrtime()
  context.blockHash = await getHashForHeight(api, height);
  callDurationHistogram.labels('getHashForHeight').observe(calculateTime(hrstart));

  const hrstart2 = process.hrtime()
  context.prevBlockHash = height > 1 ? await getHashForHeight(api, height-1) : context.blockHash
  callDurationHistogram.labels('getHashForHeight').observe(calculateTime(hrstart2));

  const [chainResp, blockResp, eventResp, transactionResp] = await Promise.all([
    chainHandlers.getMetaByHeight(api, call, context),
    blockHandlers.getByHeight(api, call, context),
    eventHandlers.getByHeight(api, call, context),
    transactionHandlers.getAnnotatedByHeight(api, call, context),
  ]);

  let stakingResp;
  if (chainResp.lastInEra) {
    stakingResp = await getStakingData(api, call, context);
  }

  let validatorPerformanceResp;
  if (chainResp.lastInSession) {
    validatorPerformanceResp = await getValidatorPerformanceData(api, call, context);
  }

  return {
    chain: chainResp,
    block: blockResp,
    staking: stakingResp,
    validatorPerformance: validatorPerformanceResp,
    event: eventResp,
    transaction: transactionResp,
  };
};

const getStakingData = async (api, call, context) => {
  try {
    return await stakingHandlers.getByHeight(api, call, context);
  } catch (err) {
    if (err instanceof InvalidArgumentError) {
      // Data not available for given height, do nothing
      return null;
    } else {
      throw err;
    }
  }
}

const getValidatorPerformanceData = async (api, call, context) => {
  try {
    return await validatorPerformanceHandlers.getByHeight(api, call, context);
  } catch (err) {
    if (err instanceof InvalidArgumentError) {
      // Data not available for given height, do nothing
      return null;
    } else {
      throw err;
    }
  }
}

module.exports = {
  getAll,
};
