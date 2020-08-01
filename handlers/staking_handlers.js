const {InvalidArgumentError} = require('../utils/errors');
const {fetchMetadataAtHeight, injectMetadata} = require('../utils/setup');
const stakingMappers = require('../mappers/staking/staking_mappers');

/**
 * Get staking information by height
 */
const getByHeight = async (api, call, context) => {
  const height = call.request.height;

  const currHeightMetadata = context.currHeightMetadata ? context.currHeightMetadata : await fetchMetadataAtHeight(api, height);
  const prevHeightMetadata = context.prevHeightMetadata ? context.prevHeightMetadata : await fetchMetadataAtHeight(api, height - 1);

  const {blockHash} = currHeightMetadata;
  const {blockHash: prevBlockHash} = prevHeightMetadata;

  // previous height calls
  injectMetadata(api, prevHeightMetadata);
  const sessionAt = await api.query.session.currentIndex.at(prevBlockHash);

  // current height calls
  injectMetadata(api, currHeightMetadata);

  const eraAtRaw = await api.query.staking.activeEra.at(blockHash);
  if (!eraAtRaw.isSome) {
    throw new InvalidArgumentError('active era not found.')
  }
  const eraAt = eraAtRaw.unwrap().index;

  // ERA QUERIES
  const erasRewardPoints = await api.query.staking.erasRewardPoints.at(blockHash, eraAt);
  const erasTotalStake = await api.query.staking.erasTotalStake.at(blockHash, eraAt);

  // Validator reward for era
  // The total validator era payout for the last HISTORY_DEPTH eras.
  // Eras that haven't finished yet or has been removed doesn't have reward.
  const erasValidatorReward = await api.query.staking.erasValidatorReward.at(blockHash, eraAt);

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
    const erasStakers = await api.query.staking.erasStakers.at(blockHash, eraAt, validatorStashAccount);
    validator.totalStake = erasStakers.total.toString();
    validator.ownStake = erasStakers.own.toString();
    validator.stakersStake = erasStakers.total - erasStakers.own;

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
    const erasValidatorPrefs = await api.query.staking.erasValidatorPrefs.at(blockHash, eraAt, validatorStashAccount);
    validator.commission = erasValidatorPrefs.commission.toString();

    validatorsData.push(validator);
  }

  return {
    staking: {
      session: sessionAt.toString(),
      era: eraAt,
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
