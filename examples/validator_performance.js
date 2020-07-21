// Import
const {ApiPromise, WsProvider} = require('@polkadot/api');

const {setupApiAtHeight} = require('../utils/setup');

const NODE_URL = 'ws://localhost:9944';
const ADDR = 'DGiLC1uvohfgHiirDtsr5HJRYXUFy9NdXj6YC6azcaRpvJZ';
const HEIGHT = 2197577;

async function init() {
  const wsProvider = new WsProvider(NODE_URL);
  const api = await ApiPromise.create({provider: wsProvider});

  const {blockHash} = await setupApiAtHeight(api, HEIGHT);

  // SESSION
  const sessionAt = await api.query.session.currentIndex.at(blockHash);
  console.log('current session #: ', sessionAt.toString());

  // ERA
  const eraAt = await api.query.staking.currentEra.at(blockHash);
  console.log('currentEra: ', eraAt.toString());

  // VALIDATORS
  const validatorsAt = await api.query.session.validators.at(blockHash);
  console.log('validatorsAt: ', validatorsAt.toHuman());

  // DISABLED VALIDATORS
  const disabledValidatorsAt = await api.query.session.disabledValidators.at(blockHash);
  console.log('disabledValidatorsAt: ', disabledValidatorsAt.toHuman());

  // IM ONLINE
  const authoredBlocks = await api.query.imOnline.authoredBlocks(sessionAt, ADDR);
  console.log('authored blocks: ', authoredBlocks.toString());

  const receivedHeartBeats = await api.query.imOnline.receivedHeartbeats(sessionAt, 0);
  console.log('receivedHeartBeats: ', receivedHeartBeats.toHuman());
}

init().then(res => {
  console.log('Done')
}).catch(err => {
  console.log('ERROR', err)
});
