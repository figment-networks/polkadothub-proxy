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
  const blockHash = await getBlockHash(api, height);
  const runtimeVersionAt = await api.rpc.state.getRuntimeVersion(blockHash);

  if (metadataCache.items[runtimeVersionAt.specVersion]) {
    console.log(`Cache hit for specVersion=${runtimeVersionAt.specVersion}.`)
  } else {
    console.log(`Cache missed. Getting metadata for ${runtimeVersionAt.specVersion}.`)

    const [metadata, chain] = await Promise.all([
      api.rpc.state.getMetadata(blockHash),
      api.rpc.system.chain(),
    ])

    const types = getSpecTypes(api.registry, chain, runtimeVersionAt.specName, runtimeVersionAt.specVersion);

    if (metadataCache.itemIds.length >= MAX_ITEMS_IN_CACHE) {
      const itemIdToRemove = metadataCache.itemIds.shift();
      delete metadataCache.items[itemIdToRemove];
    }

    metadataCache.items[runtimeVersionAt.specVersion] = {
      chain,
      specVersion: runtimeVersionAt.specVersion,
      startedAtHeight: height,
      metadata,
      types,
    };
    metadataCache.itemIds.push(runtimeVersionAt.specVersion);
  }

  return {
    height,
    blockHash,
    ...metadataCache.items[runtimeVersionAt.specVersion]
  };
}

// Return
const getBlockHash = async (api, height) => {
  if (!height || height === 0) {
    return await api.rpc.chain.getFinalizedHead();
  } else {
    return await api.rpc.chain.getBlockHash(height);
  }
}

const injectMetadata = (api, data) => {
  const {metadata, types, chain, specVersion, startedAtHeight} = data;

  console.log(`Injecting metadata [chain=${chain}] [specVersion=${specVersion}] [startedAtHeight=${startedAtHeight}]`);

  api.injectMetadata(metadata);
  api.registerTypes(types);
}

module.exports = {
  fetchMetadataAtHeight,
  injectMetadata,
};
