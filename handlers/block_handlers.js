const {fetchMetadataAtHeight, injectMetadata} = require('../utils/setup');
const blockMappers = require('../mappers/block/block_mappers');

/**
 * Get block by height
 */
const getByHeight = async (api, call, context = {}) => {
  const height = call.request.height;

  const currHeightMetadata = context.currHeightMetadata ? context.currHeightMetadata : await fetchMetadataAtHeight(api, height);
  injectMetadata(api, currHeightMetadata);

  const {blockHash} = currHeightMetadata;

  const blockResp = await api.rpc.chain.getBlock(blockHash);
  const rawBlockAt = blockResp.block;

  const rawTimestampAt = await api.query.timestamp.now.at(blockHash);

  const rawEventsAt = await api.query.system.events.at(blockHash);

  return blockMappers.toPb(blockHash, rawBlockAt, rawTimestampAt, rawEventsAt);
};

module.exports = {
  getByHeight,
};
