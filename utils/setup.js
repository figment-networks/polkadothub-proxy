const {getSpecTypes} = require('@polkadot/types-known');

/*
Since Polkadot uses WebAssembly, metadata and types can be different at different height.
We need to inject appropriate metadata and types to make sure that they are valid for given height.
 */
const setupApiAtHeight = async (api, height) => {
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const metaDataAt = await api.rpc.state.getMetadata(blockHash);
  const runtimeVersionAt = await api.rpc.state.getRuntimeVersion(blockHash);
  const chain = await api.rpc.system.chain();
  const types = getSpecTypes(api.registry, chain, runtimeVersionAt.specName, runtimeVersionAt.specVersion);

  api.injectMetadata(metaDataAt);
  api.registerTypes(types);

  return {
    chain,
    specVersion: runtimeVersionAt.specVersion,
    blockHash,
  };
}

module.exports = {
  setupApiAtHeight: setupApiAtHeight,
};
