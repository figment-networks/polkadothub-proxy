const {ApiPromise, WsProvider} = require('@polkadot/api');
const {hexToString} = require('@polkadot/util');

const {setupApiAtHeight} = require('../utils/setup');

const NODE_URL = 'ws://localhost:9944';
const ADDR = 'HeeJfizAEvorbkinL4GfRUYpxUiFST3dpnUHrh9ga2Z8Cpm';
const HEIGHT = 2045009;

async function init() {
  const wsProvider = new WsProvider(NODE_URL);
  const api = await ApiPromise.create({provider: wsProvider});

  const blockHash = await setupApiAtHeight(api, HEIGHT);

  // ACCOUNT
  const accountAt = await api.query.system.account.at(blockHash, ADDR);
  console.log('accountAt: ', accountAt.toString());

  // LEDGER
  const ledgerAt = await api.query.staking.ledger.at(blockHash, ADDR);
  console.log('ledgerAt: ', ledgerAt.toString());

  // IDENTITY
  const identity = await api.query.identity.identityOf(ADDR);
  console.log('identity: ', identity.toHuman());
  console.log('identity: ', hexToString(identity.unwrap().info.display.toHex()));
  console.log('identity: ', identity.unwrap().deposit.toString());
  console.log('identity: ', identity.unwrap().info.image.isEmpty);
  console.log('identity: ', identity.unwrap().info.display.isEmpty);
}

init().then(res => {
  console.log('Done')
}).catch(err => {
  console.log('ERROR', err)
});
