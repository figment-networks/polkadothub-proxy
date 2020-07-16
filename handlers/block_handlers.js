const {setupApiAtHeight} = require('../utils/setup');
const blockMappers = require('../mappers/block/block_mappers');

/**
 * Get block by height
 */
const getByHeight = async (api, call) => {
  const height = parseInt(call.request.height, 10);

  const {blockHash, chain, specVersion} = await setupApiAtHeight(api, height);

  const blockResp = await api.rpc.chain.getBlock(blockHash);
  const rawBlockAt = blockResp.block;

  const era = await api.query.staking.currentEra.at(blockHash);
  const session = await api.query.session.currentIndex.at(blockHash);
  const rawTimestampAt = await api.query.timestamp.now.at(blockHash);
  const currentSession = parseInt(session.toString(), 10);
  const currentEra = parseInt(era.toString(), 10);

  const rawEventsAt = await api.query.system.events.at(blockHash);

  return {
    era: currentEra,
    session: currentSession,
    chain: chain.toString(),
    specVersion: specVersion.toString(),
    blockHash: blockHash.toString(),

    ...blockMappers.toPb(rawBlockAt, rawTimestampAt, rawEventsAt)
  };
};

module.exports = {
  getByHeight,
};
