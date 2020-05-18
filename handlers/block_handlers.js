const {setupApiAtHeight} = require('../utils/setup');
const blockMappers = require('../mappers/block/block_mappers');

/**
 * Get current head information
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
 * Get meta information for given height (session and era)
 */
const getMetaByHeight = (api) => async (call, callback) => {
  const height = parseInt(call.request.height, 10);

  const lastFinalizedBlockHash = await api.rpc.chain.getFinalizedHead();
  const block = await api.rpc.chain.getBlock(lastFinalizedBlockHash);
  const lastFinalizedHeight = block.block.header.number.toNumber();

  if (height === lastFinalizedHeight) {
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      details: 'height is finalized'
    });
  }

  // Next BLOCK
  const {session: nextSession, era: nextEra, chain, specVersion} = await getMeta(api, height);

  // Current BLOCK
  const {session: currentSession, era: currentEra} = await getMeta(api, height - 1);

  callback(null, {
    era: currentEra,
    session: currentSession,
    lastInEra: nextEra !== currentEra,
    lastInSession: nextSession !== currentSession,
    chain,
    specVersion,
  });
};

/**
 * Get block by height
 */
const getByHeight = (api) => async (call, callback) => {
  const height = parseInt(call.request.height, 10);

  const {blockHash, chain, specVersion} = await setupApiAtHeight(api,height);

  const blockResp = await api.rpc.chain.getBlock(blockHash);
  const rawBlockAt = blockResp.block;

  const era = await api.query.staking.currentEra.at(blockHash);
  const session = await api.query.session.currentIndex.at(blockHash);
  const rawTimestampAt = await api.query.timestamp.now.at(blockHash);
  const currentSession = parseInt(session.toString(), 10);
  const currentEra = parseInt(era.toString(), 10);

  callback(null, {
    era: currentEra,
    session: currentSession,
    chain: chain.toString(),
    specVersion: specVersion.toString(),
    ...blockMappers.toPb(rawBlockAt, rawTimestampAt)
  });
};

/**
 * Return session and era for given height
 */
const getMeta = async (api, height) => {
  let {blockHash, chain, specVersion} = await setupApiAtHeight(api, height);

  let era = await api.query.staking.currentEra.at(blockHash);
  let session = await api.query.session.currentIndex.at(blockHash);

  return {
    chain: chain.toString(),
    specVersion: specVersion.toString(),
    session: parseInt(session.toString(), 10),
    era: parseInt(era.toString(), 10),
  }
};

module.exports = {
  getHead,
  getMetaByHeight,
  getByHeight,
};
