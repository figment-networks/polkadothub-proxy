// Import
const {ApiPromise, WsProvider} = require('@polkadot/api');

const {setupApiAtHeight} = require('../utils/setup');

const NODE_URL = 'ws://localhost:9944';
const HEIGHT = 2;

async function init() {
  const wsProvider = new WsProvider(NODE_URL);
  const api = await ApiPromise.create({provider: wsProvider});
  let resp;

  const lastFinalizedBlockHash = await api.rpc.chain.getFinalizedHead();
  const lastBlock = await api.rpc.chain.getBlock(lastFinalizedBlockHash);
  console.log('last block: ', lastBlock.toHuman());

  const {blockHash} = await setupApiAtHeight(api, HEIGHT);

  // BLOCK
  resp = await api.rpc.chain.getBlock(blockHash);
  const block = resp.block;
  console.log('block: ', block.toHuman());

  // Era
  resp = await api.query.staking.activeEra();
  console.log('activeEra: ', resp.toHuman());

  resp = await api.query.staking.historyDepth();
  console.log('historyDepth: ', resp.toHuman());

  resp = await api.query.staking.erasStartSessionIndex(990);
  console.log('erastStartSessionIndex:', resp.toHuman());

  block.extrinsics.forEach((rawExtrinsic, index) => {
    console.log('Extrinsic hash: ', rawExtrinsic.hash.toHex())
  });
}

init().then(res => {
  console.log('Done')
}).catch(err => {
  console.log('ERROR', err)
});
