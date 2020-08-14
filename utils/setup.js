const {getSpecTypes} = require('@polkadot/types-known');

const MAX_ITEMS_IN_CACHE = 100;
const metadataCache = {
  items: {},
  itemIds: [],
};

/*
Since Polkadot uses WebAssembly, metadata and types can be different at different height.
We need to inject appropriate metadata and types to make sure that they are valid for given height.
 */
const fetchMetadataAtHeight = async (api, height) => {
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const runtimeVersionAt = await api.rpc.state.getRuntimeVersion(blockHash);

  if (!metadataCache.items[runtimeVersionAt.specVersion]) {
    console.log(`Cache missed. Getting metadata for ${runtimeVersionAt.specVersion}.`)

    const metadata = await api.rpc.state.getMetadata(blockHash);
    const chain = await api.rpc.system.chain();
    const types = getSpecTypes(api.registry, chain, runtimeVersionAt.specName, runtimeVersionAt.specVersion);

    if (metadataCache.itemIds.length >= MAX_ITEMS_IN_CACHE) {
      const itemIdToRemove = metadataCache.itemIds.shift();
      delete metadataCache.items[itemIdToRemove];
    }

    metadataCache.items[runtimeVersionAt.specVersion] = {
      chain,
      specVersion: runtimeVersionAt.specVersion,
      height,
      blockHash,
      metadata,
      types,
    };
    metadataCache.itemIds.push(runtimeVersionAt.specVersion);
  } else {
    console.log(`Cache hit for ${runtimeVersionAt.specVersion}.`)
  }

  return metadataCache.items[runtimeVersionAt.specVersion];
}

const injectMetadata = (api, data) => {
  const {metadata, types, chain, specVersion, height} = data;

  console.log(`Injecting metadata [chain=${chain}] [specVersion=${specVersion}] [height=${height}]`);

  api.injectMetadata(metadata);
  api.registerTypes(types);
}

module.exports = {
  fetchMetadataAtHeight,
  injectMetadata,
};
