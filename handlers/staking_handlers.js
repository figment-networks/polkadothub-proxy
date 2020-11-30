const {InvalidArgumentError} = require('../utils/errors');
const {getHashForHeight} = require('../utils/block');
/**
 * Get staking information by height
 */
const getByHeight = async (api, call, context = {}) => {
  const height = call.request.height;

  const prevBlockHashAt = context.prevBlockHash ? context.prevBlockHash : await getHashForHeight(api, height-1);
  const blockHash = context.blockHash ? context.blockHash : await getHashForHeight(api, height);
  const [sessionAt, eraAtRaw, currBlockHash] = await Promise.all([
    api.query.session.currentIndex.at(prevBlockHashAt),
    api.query.staking.activeEra.at(blockHash),
    api.rpc.chain.getFinalizedHead(),
  ]);

  if (eraAtRaw.isNone) {
    throw new InvalidArgumentError('active era not found.')
  }
  const eraAt = eraAtRaw.unwrap().index.toNumber();

  const [erasRewardPoints, erasTotalStake, erasValidatorReward, queuedKeys, validatorsAt] = await Promise.all([
      // ERA QUERIES
      api.query.staking.erasRewardPoints.at(currBlockHash, eraAt),
      api.query.staking.erasTotalStake.at(currBlockHash, eraAt),
      // Validator reward for era
      // The total validator era payout for the last HISTORY_DEPTH eras.
      // Eras that haven't finished yet or has been removed doesn't have reward.
      api.query.staking.erasValidatorReward.at(currBlockHash, eraAt),

      // Fetch session keys for validators. Most probably the query is `queuedKeys`,
      // but there's a chance it should be `nextKeys`
      // https://github.com/polkadot-js/api/blob/master/packages/api-derive/src/staking/query.ts#L108
      // https://github.com/polkadot-js/api/issues/2288
      api.query.session.queuedKeys.at(blockHash),
      api.query.session.validators.at(blockHash),
  ]);

  const maxNominatorRewardedPerValidator = api.consts.staking.maxNominatorRewardedPerValidator
  const promises = [];
  for (const rawValidator of validatorsAt) {
    const validatorStashAccount = rawValidator.toString();
    const validator = {
      stashAccount: validatorStashAccount,
      rewardPoints: (erasRewardPoints.individual.toJSON()[validatorStashAccount] || '0').toString(),
      stakers: [],
      sessionKeys: validatorSessionKeys(queuedKeys, validatorStashAccount)
    };
    promises.push(getValidatorData(validator, api, blockHash, eraAt, maxNominatorRewardedPerValidator));
  }

  const validatorsData = await Promise.all(promises)

  return {
    staking: {
      session: sessionAt.toString(),
      era: eraAt,
      totalStake: erasTotalStake.toString(),
      totalRewardPayout: erasValidatorReward.isNone ? '0' : erasValidatorReward.unwrap().toString(10),
      totalRewardPoints: erasRewardPoints.total.toString(),
      validators: validatorsData,
    }
  };
};

const validatorSessionKeys = (queuedKeys, validatorStashAccount) => {
  const keysRow = queuedKeys.map((keys) => keys.toHuman()).find((row) => {
    const account = row[0];
    return account.toString() === validatorStashAccount;
  })
  return keysRow ? keysRow[1] : [];
}

const getValidatorData = async function(validator, api, blockHash, eraAt, maxNominatorRewardedPerValidator) {
  // Get validator controller account
  const validatorControllerAccount = await api.query.staking.bonded.at(blockHash, validator.stashAccount);
  if (!validatorControllerAccount.isEmpty) {
    validator.controllerAccount = validatorControllerAccount.toString();
  }

  // Get stakers for validator
  const erasStakers = await api.query.staking.erasStakers.at(blockHash, eraAt, validator.stashAccount);
  validator.totalStake = erasStakers.total.toString();
  validator.ownStake = erasStakers.own.toString();
  validator.stakersStake = erasStakers.total - erasStakers.own;

  if (erasStakers.others.length > maxNominatorRewardedPerValidator.toNumber()) {
    // sort stakes by stake desc. Only top $maxNominatorRewardedPerValidator can receive rewards
    erasStakers.others.sort(function (a, b) {
      return  b.value.toString() - a.value.toString();
    });
  }


  validator.stakers = await Promise.all(erasStakers.others.map(async (stake, i) =>  {
    const nominatorStashAccount = stake.who;

    // Get nominator stash account
    const nominatorControllerAccount = await api.query.staking.bonded.at(blockHash, nominatorStashAccount);
    return {
      stashAccount: nominatorStashAccount.toString(),
      controllerAccount: nominatorControllerAccount.toString(),
      stake: stake.value.toString(),
      isRewardEligible: i < maxNominatorRewardedPerValidator,
    }
  }))

  // Get Validator prefs (commission)
  const erasValidatorPrefs = await api.query.staking.erasValidatorPrefs.at(blockHash, eraAt, validator.stashAccount);
  validator.commission = erasValidatorPrefs.commission.toString();
  return validator
}

module.exports = {
  getByHeight,
};