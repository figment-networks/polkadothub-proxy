const {InvalidArgumentError} = require('../utils/errors');
const {fetchMetadataAtHeight, injectMetadata} = require('../utils/setup');

/**
 * Get current head information
 */
const getHead = async (api, _call, context) => {
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
const getStatus = async (api, _call, context) => {
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
const getMetaByHeight = async (api, call, context) => {
  const height = call.request.height;

  const lastFinalizedBlockHash = await api.rpc.chain.getFinalizedHead();
  const block = await api.rpc.chain.getBlock(lastFinalizedBlockHash);
  const lastFinalizedHeight = block.block.header.number.toNumber();

  if (height === lastFinalizedHeight) {
    throw new InvalidArgumentError('height is finalized');
  }

  const currHeightMetadata = context.currHeightMetadata ? context.currHeightMetadata : await fetchMetadataAtHeight(api, height);
  const prevHeightMetadata = context.prevHeightMetadata ? context.prevHeightMetadata : await fetchMetadataAtHeight(api, height - 1);

  // Current height
  injectMetadata(api, currHeightMetadata);

  const {blockHash} = currHeightMetadata;
  const rawCurrentEra = await api.query.staking.currentEra.at(blockHash);
  const currentEra = parseInt(rawCurrentEra.toString(), 10);
  const rawCurrentSession = await api.query.session.currentIndex.at(blockHash);
  const currentSession = parseInt(rawCurrentSession.toString(), 10);

  // Previous height
  injectMetadata(api, prevHeightMetadata);

  const {chain, specVersion, blockHash: prevBlockHash} = prevHeightMetadata;

  const rawPrevEra = await api.query.staking.currentEra.at(prevBlockHash);
  const prevEra = parseInt(rawPrevEra.toString(), 10);
  const rawPrevSession = await api.query.session.currentIndex.at(prevBlockHash);
  const prevSession = parseInt(rawPrevSession.toString(), 10);
  const rawTimestampAt = await api.query.timestamp.now.at(prevBlockHash);

  return {
    time: {seconds: rawTimestampAt.toNumber() / 1000, nanos: 0},
    era: prevEra,
    session: prevSession,
    lastInEra: prevEra !== currentEra,
    lastInSession: prevSession !== currentSession,
    chain: chain.toString(),
    specVersion: specVersion.toString(),
  };
};

/**
 * Return session and era for given height
 */
const getMeta = async (api, height) => {
  const data = await fetchMetadataAtHeight(api, height);
  injectMetadata(api, data);

  let {blockHash, chain, specVersion} = data;

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
