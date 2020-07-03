// Import
const {ApiPromise, WsProvider} = require('@polkadot/api');

const {setupApiAtHeight} = require('../utils/setup');

const NODE_URL = 'ws://localhost:9944';
const HEIGHT = 2;

async function init() {
  const wsProvider = new WsProvider(NODE_URL);
  const api = await ApiPromise.create({provider: wsProvider});

  const lastFinalizedBlockHash = await api.rpc.chain.getFinalizedHead();
  const lastBlock = await api.rpc.chain.getBlock(lastFinalizedBlockHash);
  console.log('last block: ', lastBlock.toHuman());

  const {blockHash} = await setupApiAtHeight(api, HEIGHT);

  // BLOCK
  const resp = await api.rpc.chain.getBlock(blockHash);
  const block = resp.block;
  console.log('block: ', block.toHuman());

}

init().then(res => {
  console.log('Done')
}).catch(err => {
  console.log('ERROR', err)
});
