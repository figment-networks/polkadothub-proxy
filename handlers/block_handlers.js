const {getHashForHeight} = require('../utils/block');
const {createCalcFee} = require("../utils/calc");
const {rollbar} = require('../utils/rollbar');
const {UnavailableError} = require('../utils/errors');
const blockMappers = require('../mappers/block/block_mappers');

/**
 * Get block by height
 */
const getByHeight = async (api, call, context = {}) => {
  const height = parseInt(call.request.height, 10);
  const blockHash = context.blockHash ? context.blockHash : await getHashForHeight(api, height);
  const prevBlockHash = context.prevBlockHash ? context.prevBlockHash : (height > 1 ? await getHashForHeight(api, height-1) : blockHash);
  let parentParentHash = prevBlockHash;
  if (height > 1) {
    parentParentHash = (await api.rpc.chain.getHeader(prevBlockHash)).parentHash;
  }

  const [blockResp, rawTimestampAt, rawEventsAt, rawCurrentEra, rawMetadata, rawVersion, rawMultiplier] = await Promise.all([
    api.rpc.chain.getBlock(blockHash),
    api.query.timestamp.now.at(blockHash),
    api.query.system.events.at(blockHash),
    api.query.staking.currentEra.at(prevBlockHash),
    api.rpc.state.getMetadata(parentParentHash),
    api.rpc.state.getRuntimeVersion(parentParentHash),
    api.query.transactionPayment.nextFeeMultiplier.at(prevBlockHash),
  ]);

  const rawBlockAt = blockResp.block;

  let calcFee;
  try {
    calcFee = await createCalcFee(api, rawMetadata, rawVersion, rawMultiplier);
  } catch(err) {
    rollbar.error(err, {call});
    throw new UnavailableError('could not calculate fee');
  }

  return blockMappers.toPb(blockHash, rawBlockAt, rawTimestampAt, rawEventsAt, rawCurrentEra, calcFee);
};

module.exports = {
  getByHeight,
};
