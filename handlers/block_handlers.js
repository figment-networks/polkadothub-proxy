const {setupApiAtHeight} = require('../utils/setup');
const blockMappers = require('../mappers/block/block_mappers');

/**
 * Get block by height
 */
const getByHeight = (api) => async (call, callback) => {
  const height = call.request.height;

  const blockHash = await setupApiAtHeight(api,height);

  // BLOCK
  const resp = await api.rpc.chain.getBlock(blockHash);
  const rawBlockAt = resp.block;

  // TIMESTAMP
  const rawTimestampAt = await api.query.timestamp.now.at(blockHash);

  callback(null, blockMappers.toPb(rawBlockAt, rawTimestampAt));
};

module.exports = {
  getByHeight,
};
