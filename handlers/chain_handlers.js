const {InvalidArgumentError} = require('../utils/errors');
const {setupApiAtHeight} = require('../utils/setup');

/**
 * Get current head information
 */
const getHead = async (api, _call) => {
  // No need to set metadata and types here since most recent are loaded automatically

  const lastFinalizedBlockHash = await api.rpc.chain.getFinalizedHead();
  const block = await api.rpc.chain.getBlock(lastFinalizedBlockHash);
  const era = await api.query.staking.currentEra();
  const session = await api.query.session.currentIndex();
  const timestamp = await api.query.timestamp.now();

  return {
    height: block.block.header.number.toNumber(),
    time: {seconds: timestamp.toNumber() / 1000, nanos: 0},
    session: session.toNumber(),
    era: era.toString(),
  };
};

/**
 * Get status information
 */
const getStatus = async (api, _call) => {
  // CLIENT
  const clientInfo = api.libraryInfo;

  // CHAIN
  const chainName = await api.rpc.system.chain();
  const chainType = await api.rpc.system.chainType();

  // NODE
  const nodeName = await api.rpc.system.name();
  const nodeHealth = await api.rpc.system.health();
  const nodeRoles = await api.rpc.system.nodeRoles();
  const nodeVersion = await api.rpc.system.version();
  const nodeLocalPeerUid = await api.rpc.system.localPeerId();
  const nodeProperties = await api.rpc.system.properties();
  console.log('Node specific properties:', nodeProperties.toHuman());

  // RUNTIME
  const genesisHash = api.genesisHash.toHex();

  return {
    clientInfo,
    chainName,
    chainType,
    nodeName,
    nodeHealth,
    nodeRoles,
    nodeVersion,
    nodeLocalPeerUid,
    nodeProperties,
    genesisHash,
  };
};

/**
 * Get meta information for given height (session and era)
 */
const getMetaByHeight = async (api, call) => {
  const height = call.request.height;

  const lastFinalizedBlockHash = await api.rpc.chain.getFinalizedHead();
  const block = await api.rpc.chain.getBlock(lastFinalizedBlockHash);
  const lastFinalizedHeight = block.block.header.number.toNumber();

  if (height === lastFinalizedHeight) {
    throw new InvalidArgumentError('height is finalized');
  }

  // Next BLOCK
  const {session: nextSession, era: nextEra, chain, specVersion} = await getMeta(api, height);

  // Current BLOCK
  const {blockHash, session: currentSession, era: currentEra} = await getMeta(api, parseInt(height, 10) - 1);
  const rawTimestampAt = await api.query.timestamp.now.at(blockHash);

  return {
    time: {seconds: rawTimestampAt.toNumber() / 1000, nanos: 0},
    era: currentEra,
    session: currentSession,
    lastInEra: nextEra !== currentEra,
    lastInSession: nextSession !== currentSession,
    chain,
    specVersion,
  };
};

/**
 * Return session and era for given height
 */
const getMeta = async (api, height) => {
  let {blockHash, chain, specVersion} = await setupApiAtHeight(api, height);

  let era = await api.query.staking.currentEra.at(blockHash);
  let session = await api.query.session.currentIndex.at(blockHash);

  return {
    blockHash,
    chain: chain.toString(),
    specVersion: specVersion.toString(),
    session: parseInt(session.toString(), 10),
    era: parseInt(era.toString(), 10),
  };
};

module.exports = {
  getHead,
  getStatus,
  getMetaByHeight,
};
