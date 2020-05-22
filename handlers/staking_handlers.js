const {setupApiAtHeight} = require('../utils/setup');
const stakingMappers = require('../mappers/staking/staking_mappers');

/**
 * Get staking information by height
 */
const getByHeight = async (api, call) => {
  const height = call.request.height;

  const {blockHash: prevBlockHash} = await setupApiAtHeight(api, height - 1);
  const blockHash = await api.rpc.chain.getBlockHash(height);

  const timestamp = await api.query.timestamp.now.at(blockHash);
  console.log('timestamp', timestamp.toNumber());

  const sessionAt = await api.query.session.currentIndex.at(prevBlockHash);
  console.log('current session #: ', sessionAt.toString());

  const eraAt = await api.query.staking.currentEra.at(prevBlockHash);
  console.log('currentEra: ', eraAt.toString());

  // ERA QUERIES
  const erasRewardPoints = await api.query.staking.erasRewardPoints(eraAt.toString());
  console.log('erasRewardPoints: ', erasRewardPoints.toString());

  const erasTotalStake = await api.query.staking.erasTotalStake(eraAt.toString());
  console.log('erasTotalStake: ', erasTotalStake.toString());

  // Validator reward for era
  // The total validator era payout for the last HISTORY_DEPTH eras.
  // Eras that haven't finished yet or has been removed doesn't have reward.
  const erasValidatorReward = await api.query.staking.erasValidatorReward(eraAt.toString());
  console.log('erasValidatorReward: ', erasValidatorReward.toString());

  // Fetch session keys for validators. Most probably the query is `queuedKeys`,
  // but there's a chance it should be `nextKeys`
  // https://github.com/polkadot-js/api/blob/master/packages/api-derive/src/staking/query.ts#L108
  // https://github.com/polkadot-js/api/issues/2288
  const queuedKeys = await api.query.session.queuedKeys.at(blockHash);

  const validatorsAt = await api.query.session.validators.at(blockHash);
  const validatorsData = [];
  for (const rawValidator of validatorsAt) {
    const validatorStashAccount = rawValidator.toString();
    const validator = {
      stashAccount: validatorStashAccount,
      rewardPoints: (erasRewardPoints.individual.toJSON()[validatorStashAccount] || '0').toString(),
      stakers: [],
      sessionKeys: validatorSessionKeys(queuedKeys, validatorStashAccount)
    };

    // Get validator controller account
    const validatorControllerAccount = await api.query.staking.bonded.at(blockHash, validatorStashAccount);
    if (!validatorControllerAccount.isEmpty) {
      validator.controllerAccount = validatorControllerAccount.toString();
    }

    // Get stakers for validator
    const erasStakers = await api.query.staking.erasStakers(eraAt.toString(), validatorStashAccount);
    validator.totalStake = erasStakers.total.toString();
    validator.ownStake = erasStakers.own.toString();

    for (const stake of erasStakers.others) {
      const nominatorStashAccount = stake.who;

      // Get nominator stash account
      const nominatorControllerAccount = await api.query.staking.bonded.at(blockHash, nominatorStashAccount);

      validator.stakers.push({
        stashAccount: nominatorStashAccount.toString(),
        controllerAccount: nominatorControllerAccount.toString(),
        stake: stake.value.toString(),
      })
    }

    // Get Validator prefs (commission)
    const erasValidatorPrefs = await api.query.staking.erasValidatorPrefs(eraAt.toString(), validatorStashAccount);
    validator.commission = erasValidatorPrefs.commission.toString();

    validatorsData.push(validator);
  }

  return {
    staking: {
      session: sessionAt.toString(),
      era: eraAt.toString(),
      totalStake: erasTotalStake.toString(),
      totalRewardPayout: (erasValidatorReward.isEmpty ? '0' : erasValidatorReward).toString(),
      totalRewardPoints: erasRewardPoints.total.toString(),
      validators: validatorsData,
    },
  };
};

const validatorSessionKeys = (queuedKeys, validatorStashAccount) => {
  const keysRow = queuedKeys.map((keys) => keys.toHuman()).find((row) => {
    const account = row[0];
    return account.toString() === validatorStashAccount;
  })
  return keysRow ? keysRow[1] : [];
}

module.exports = {
  getByHeight,
};
