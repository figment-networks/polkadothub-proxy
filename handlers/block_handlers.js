const {fetchMetadataAtHeight, injectMetadata} = require('../utils/setup');
const {createCalcFee} = require("../utils/calc");
const {rollbar} = require('../utils/rollbar');
const {UnavailableError} = require('../utils/errors');
const blockMappers = require('../mappers/block/block_mappers');

/**
 * Get block by height
 */
const getByHeight = async (api, call, context = {}) => {
  const height = call.request.height;

  const currHeightMetadata = context.currHeightMetadata ? context.currHeightMetadata : await fetchMetadataAtHeight(api, height);
  injectMetadata(api, currHeightMetadata);

  const {blockHash} = currHeightMetadata;

  const [blockResp, rawTimestampAt, rawEventsAt] = await Promise.all([
    api.rpc.chain.getBlock(blockHash),
    api.query.timestamp.now.at(blockHash),
    api.query.system.events.at(blockHash),
  ]);

  const rawBlockAt = blockResp.block;

  let calcFee;
  try {
    calcFee = await createCalcFee(api, rawBlockAt.header.parentHash, rawBlockAt);
  } catch(err) {
    rollbar.error(err, {call});
    throw new UnavailableError('could not calculate fee');
  }

  return blockMappers.toPb(blockHash, rawBlockAt, rawTimestampAt, rawEventsAt, calcFee);
};

module.exports = {
  getByHeight,
};
