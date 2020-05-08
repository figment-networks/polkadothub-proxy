// Import
const {ApiPromise, WsProvider} = require('@polkadot/api');

const {setupApiAtHeight} = require('../utils/setup');

const NODE_URL = 'ws://localhost:9944';
const HEIGHT = 1;

async function init() {
  const wsProvider = new WsProvider(NODE_URL);
  const api = await ApiPromise.create({provider: wsProvider});

  const {blockHash} = await setupApiAtHeight(api, HEIGHT);

  // BLOCK
  const resp = await api.rpc.chain.getBlock(blockHash);
  const block = resp.block;
  console.log('block: ', block.extrinsics[0]);
}

init().then(res => {
  console.log('Done')
}).catch(err => {
  console.log('ERROR', err)
});
