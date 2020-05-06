// Import
const {ApiPromise, WsProvider} = require('@polkadot/api');

const {setupApiAtHeight} = require('../utils/setup');

const NODE_URL = 'ws://localhost:9944';
const HEIGHT = 1805384;

async function init() {
  const wsProvider = new WsProvider(NODE_URL);
  const api = await ApiPromise.create({provider: wsProvider});

  const blockHash = await setupApiAtHeight(api, HEIGHT);

  // EVENTS
  const eventsAt = await api.query.system.events.at(blockHash);
  console.log('eventsAt: ', eventsAt.toHuman());
}

init().then(res => {
  console.log('Done')
}).catch(err => {
  console.log('ERROR', err)
});
