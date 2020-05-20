const eventMappers = require('../mappers/event_mappers');

/**
 * Implements the getBlockHash RPC method.
 */
const get = async (api, call) => {
  // LIBRARY
  const libraryInfo = api.libraryInfo;
  console.log('library info:', libraryInfo);

  // CHAIN
  const chain = await api.rpc.system.chain();
  console.log('chain name: ', chain.toString());

  // NETWORK
  // const networkState = await api.rpc.system.networkState();
  // console.log('Network state: ', networkState.toString());

  // NODE
  const health = await api.rpc.system.health();
  console.log('node health: ', health.toString());
  const nodeName = await api.rpc.system.name();
  console.log('node name: ', nodeName.toString());
  const nodeRoles = await api.rpc.system.nodeRoles();
  console.log('node roles: ', nodeRoles.toString());
  const nodeVersion = await api.rpc.system.version();
  console.log('node version: ', nodeVersion.toString());
  const nodeProperties = await api.rpc.system.properties();
  if (nodeProperties.size > 0) {
    console.log('Node specific properties:');
    nodeProperties.forEach((value, key) => {
      console.log(key, value.toString());
    });
  } else {
    console.log('No specific chain properties found.');
  }

  // RUNTIME
  const genesisHash = api.genesisHash.toHex();
  console.log('genesis hash:', genesisHash);

  const runtimeVersion = api.runtimeVersion;
  // console.log('runtime version', runtimeVersion.toString());

  const runtimeMetadata = api.runtimeMetadata;
  // console.log('runtime metadata', runtimeMetadata.toString());

  // constants are values that are defined in the runtime and used as part of chain operations. These constants can be changed as part of an upgrade.
  // Since these are constants and defined by the metadata, it is not a call,
  // but rather the values immediately available - as you'll see in subsequent sections,
  // there is no need for await on these, it immediately returns the type and value for you to work with.
  // Thanks to metadata, we know what type are thee values that are returned and those values are automatically "casted" to correct type
  console.log('babe.epochDurations: ', api.consts.babe.epochDuration.toNumber());
  console.log('babe.expectedBlockTime: ', api.consts.babe.expectedBlockTime.toNumber());
  console.log('balances.existentialDeposit: ', api.consts.balances.existentialDeposit.toNumber());
  console.log('staking.sessionsPerEra: ', api.consts.staking.sessionsPerEra.toNumber());
  console.log('staking.bondingDuration: ', api.consts.staking.bondingDuration.toNumber());


  const response = eventMappers.toPb(eventsAt);


  return response;
};

module.exports = {
  getByHeight,
};
