// Import
const {ApiPromise, WsProvider} = require('@polkadot/api');

const {setupApiAtHeight} = require('../utils/setup');

const NODE_URL = 'ws://localhost:9944';
const ADDR = 'DuRV4MSm54UoX3MpFe3P7rxjBFLfnKRThxG66s4n3yF8qbJ';
const NOMINATOR = 'FVR7HagsWZKVKyHNNrLWn1vqtrCZCemnG7Dk1KLyUcwd9QJ';
// const HEIGHT = 558037;
const HEIGHT = 2278812;

async function init() {
  const wsProvider = new WsProvider(NODE_URL);
  const api = await ApiPromise.create({provider: wsProvider});

  const {blockHash} = await setupApiAtHeight(api, HEIGHT);

  const sessionAt = await api.query.session.currentIndex.at(blockHash);
  console.log('current session #: ', sessionAt.toString());

  const eraAt = await api.query.staking.currentEra.at(blockHash);
  console.log('currentEra: ', eraAt.toString());

  const activeEraAtOpt = await api.query.staking.activeEra.at(blockHash);

  if (!activeEraAtOpt.isSome) {
    throw new Error('No active era found');
  }
  const activeEraAt = activeEraAtOpt.unwrap().index;
  console.log('activeEra:', activeEraAt.toString());

  // VALIDATORS
  const validatorsAt = await api.query.session.validators.at(blockHash);
  console.log('validators at: ', JSON.stringify(validatorsAt.toJSON()));

  // Map from all locked "stash" accounts to the controller account.
  const bondedAt = await api.query.staking.bonded.at(blockHash, ADDR);
  console.log('bonded at: ', bondedAt.toString());

  // const bondedErasAt = await api.query.staking.bondedEras();
  // console.log('bonded eras at: ', bondedErasAt.toString());

  // const canceledSlashPayoutAt = await api.query.staking.canceledSlashPayout.at(blockHash);
  // console.log('canceledSlashPayoutAt: ', canceledSlashPayoutAt.toString());

  // ----------ERA QUERIES
  const erasRewardPoints = await api.query.staking.erasRewardPoints.at(blockHash, activeEraAt);
  console.log('erasRewardPoints: ', erasRewardPoints.toHuman());
  // console.log('erasRewardPoints for stash: ', erasRewardPoints.individual.toJSON()["Cdaq3iUobZLYD2d8oqRQf1VKuRo6H64KsMBgJyxap4ZnARX"]);


  const erasTotalStake = await api.query.staking.erasTotalStake.at(blockHash, activeEraAt);
  console.log('erasTotalStake: ', erasTotalStake.toString());

  // Validator reward for era
  const erasValidatorReward = await api.query.staking.erasValidatorReward.at(blockHash, activeEraAt);
  console.log('erasValidatorReward: ', erasValidatorReward);

  // ----------ERA QUERIES: VALIDATORS

  // Get stakers for validator for era
  const erasStakers = await api.query.staking.erasStakers.at(blockHash, activeEraAt, ADDR);
  console.log('erasStakers: ', erasStakers.toString());

  // Validator prefs for era (commission)
  const erasValidatorPrefs = await api.query.staking.erasValidatorPrefs.at(blockHash, activeEraAt, ADDR);
  console.log('erasValidatorPrefs: ', erasValidatorPrefs.toHuman());

  // Nominator slashes
  // const nominatorSlashInEra = await api.query.staking.nominatorSlashInEra(eraAt, NOMINATOR);
  // console.log('nominatorSlashInEra: ', nominatorSlashInEra.toString());

  // Validator slashes
  // const validatorSlashInEra = await api.query.staking.validatorSlashInEra(eraAt, ADDR);
  // console.log('validatorSlashInEra: ', validatorSlashInEra.toString());


  const erasStartSessionIndex = await api.query.staking.erasStartSessionIndex(activeEraAt);
  console.log('erasStartSessionIndex: ', erasStartSessionIndex.toString());


  const ledgerAt = await api.query.staking.ledger.at(blockHash, ADDR);
  console.log('ledgerAt: ', ledgerAt.toString());

  // const nominationsAt = await api.query.staking.nominators.at(blockHash, NOMINATOR);
  // console.log('nominationsAt: ', nominationsAt.toString());
}

init().then(res => {
  console.log('Done')
}).catch(err => {
  console.log('ERROR', err)
});
