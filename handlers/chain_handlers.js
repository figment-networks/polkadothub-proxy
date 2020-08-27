const {InvalidArgumentError} = require('../utils/errors');
const {fetchMetadataAtHeight, injectMetadata} = require('../utils/setup');

/**
 * Get current head information
 */
const getHead = async (api, _call, context) => {
  const finalizedHeightMetadata = await fetchMetadataAtHeight(api);
  injectMetadata(api, finalizedHeightMetadata);

  const {blockHash} = finalizedHeightMetadata;

  const block = await api.rpc.chain.getBlock(blockHash);
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
const getStatus = async (api, _call, context = {}) => {
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
const getMetaByHeight = async (api, call, context = {}) => {
  const height = parseInt(call.request.height, 10);

  // Previous height
  // To get current session and era we need to use previous block hash
  const prevHeight = height - 1;
  const prevHeightMetadata = context.prevHeightMetadata ? context.prevHeightMetadata : await fetchMetadataAtHeight(api, prevHeight);

  injectMetadata(api, prevHeightMetadata);

  const {chain, specVersion, blockHash: prevBlockHash} = prevHeightMetadata;

  const rawCurrentEra = await api.query.staking.currentEra.at(prevBlockHash);
  const currentEra = parseInt(rawCurrentEra.toString(), 10);
  const rawCurrentSession = await api.query.session.currentIndex.at(prevBlockHash);
  const currentSession = parseInt(rawCurrentSession.toString(), 10);

  // Current height
  // Current height block hash gets next era and session
  const currHeightMetadata = context.currHeightMetadata ? context.currHeightMetadata : await fetchMetadataAtHeight(api, height);

  injectMetadata(api, currHeightMetadata);

  const {blockHash: currBlockHash} = currHeightMetadata;

  const rawNextEra = await api.query.staking.currentEra.at(currBlockHash);
  const nextEra = parseInt(rawNextEra.toString(), 10);
  const rawNextSession = await api.query.session.currentIndex.at(currBlockHash);
  const nextSession = parseInt(rawNextSession.toString(), 10);
  const rawTimestampAt = await api.query.timestamp.now.at(currBlockHash);

  return {
    time: {seconds: rawTimestampAt.toNumber() / 1000, nanos: 0},
    era: currentEra,
    session: currentSession,
    lastInEra: nextEra !== currentEra,
    lastInSession: nextSession !== currentSession,
    chain: chain.toString(),
    specVersion: specVersion.toString(),
  };
};

module.exports = {
  getHead,
  getStatus,
  getMetaByHeight,
};
