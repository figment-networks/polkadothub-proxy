const {setupApiAtHeight} = require('../utils/setup');
const blockMappers = require('../mappers/block/block_mappers');

/**
 * Get head
 */
const getHead = (api) => async (call, callback) => {
  // No need to set metadata and types here since most recent are loaded automatically

  const lastFinalizedBlockHash = await api.rpc.chain.getFinalizedHead();
  const block = await api.rpc.chain.getBlock(lastFinalizedBlockHash);
  const era = await api.query.staking.currentEra();
  const session = await api.query.session.currentIndex();
  const timestamp = await api.query.timestamp.now();

  callback(null, {
    height: block.block.header.number.toNumber(),
    time: {seconds: timestamp.toNumber() / 1000, nanos: 0},
    session: session.toNumber(),
    era: era.toString(),
  });
};

/**
 * Get block by height
 */
const getByHeight = (api) => async (call, callback) => {
  const height = call.request.height;

  const {blockHash, chain, specVersion} = await setupApiAtHeight(api,height);

  // BLOCK
  const blockResp = await api.rpc.chain.getBlock(blockHash);
  const rawBlockAt = blockResp.block;

  // TIMESTAMP
  const rawTimestampAt = await api.query.timestamp.now.at(blockHash);

  callback(null, {
    chain: chain.toString(),
    specVersion: specVersion.toString(),
    ...blockMappers.toPb(rawBlockAt, rawTimestampAt)
  });
};

module.exports = {
  getHead,
  getByHeight,
};
