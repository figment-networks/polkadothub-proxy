const {getHashForHeight} = require('../utils/block');

/**
 * Get current head information
 */
const getHead = async (api, _call, context) => {
  const blockHash = await getHashForHeight(api);

  const [block, era, session, timestamp] = await Promise.all([
      api.rpc.chain.getBlock(blockHash),
      api.query.staking.currentEra(),
      api.query.session.currentIndex(),
      api.query.timestamp.now(),
  ]);

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

  const blockHash = context.blockHash ? context.blockHash : await getHashForHeight(api, height);
  const prevBlockHash = context.prevBlockHash ? context.prevBlockHash : (height > 1 ? await getHashForHeight(api, height-1) : blockHash)

  const [chain, runtimeVersionAt, rawCurrentEra, rawCurrentSession, rawNextEra, rawNextSession, rawTimestampAt
  ] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.state.getRuntimeVersion(prevBlockHash),
    // To get current session and era we need to use previous block hash
    api.query.staking.currentEra.at(prevBlockHash),
    api.query.session.currentIndex.at(prevBlockHash),
    // Current height block hash gets next era and session
    api.query.staking.currentEra.at(blockHash),
    api.query.session.currentIndex.at(blockHash),
    api.query.timestamp.now.at(blockHash),

  ])
  const currentEra = parseInt(rawCurrentEra.toString(), 10);
  const currentSession = parseInt(rawCurrentSession.toString(), 10);
  const nextEra = parseInt(rawNextEra.toString(), 10);
  const nextSession = parseInt(rawNextSession.toString(), 10);

  return {
    time: {seconds: rawTimestampAt.toNumber() / 1000, nanos: 0},
    era: currentEra,
    session: currentSession,
    lastInEra: nextEra !== currentEra,
    lastInSession: nextSession !== currentSession,
    chain: chain.toString(),
    specVersion: runtimeVersionAt.specVersion.toString(),
  };
};

module.exports = {
  getHead,
  getStatus,
  getMetaByHeight,
};
