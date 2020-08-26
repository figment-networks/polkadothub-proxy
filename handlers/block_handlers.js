const {fetchMetadataAtHeight, injectMetadata} = require('../utils/setup');
const {createCalcFee} = require("../utils/calc");
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
  const calcFee = await createCalcFee(api, rawBlockAt);

  return blockMappers.toPb(blockHash, rawBlockAt, rawTimestampAt, rawEventsAt, calcFee);
};

module.exports = {
  getByHeight,
};
