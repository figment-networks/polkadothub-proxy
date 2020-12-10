const {InvalidArgumentError, InternalServerError} = require('../utils/errors');
const {getHashForHeight} = require('../utils/block');
/**
 * Get staking information by height
 */
const getByHeight = async (api, call, context = {}) => {
  const height = call.request.height;

  const prevBlockHashAt = context.prevBlockHash ? context.prevBlockHash : await getHashForHeight(api, height-1);
  const blockHash = context.blockHash ? context.blockHash : await getHashForHeight(api, height);
  const [sessionAt, eraAtRaw, currBlockHash, currentEraRaw] = await Promise.all([
    api.query.session.currentIndex.at(prevBlockHashAt),
    api.query.staking.activeEra.at(blockHash),
    api.rpc.chain.getFinalizedHead(),
    api.query.staking.currentEra(),
  ]);

  if (eraAtRaw.isNone) {
    throw new InvalidArgumentError('active era not found.')
  }
  const eraAt = eraAtRaw.unwrap().index.toNumber();

  if (currentEraRaw.isNone) {
    throw new InternalServerError(
      'CurrentEra is None when Some was expected'
    );
  }
  const currentEra = currentEraRaw.unwrap().toNumber();

  const historyDepth = await api.query.staking.historyDepth.at(currBlockHash)
  const depth = (currentEra - eraAt)
  if ( depth > historyDepth.toNumber()) {
    throw new InvalidArgumentError('Must specify a height where era depth is less than history depth')
  }

  const [erasRewardPoints, erasTotalStake, erasValidatorReward, queuedKeys, eraStakers, erasValidatorPrefs] = await Promise.all([
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
      api.query.staking.erasStakers.entries(eraAt),
      api.query.staking.erasValidatorPrefs.entries(eraAt),
  ]);

  const maxNominatorRewardedPerValidator = api.consts.staking.maxNominatorRewardedPerValidator;
  var promises = eraStakers.map(async ([key, data]) => {
    const validatorStashAccount = key.args[1].toHuman()
    const validatorControllerAccount =  await api.query.staking.bonded.at(blockHash, validatorStashAccount);
    
    if (data.others.length > maxNominatorRewardedPerValidator.toNumber()) {
      // sort stakers by stake desc. Only top $maxNominatorRewardedPerValidator can receive rewards
      data.others.sort(function (a, b) {
        return  b.value.toString() - a.value.toString();
      });
    }

    var stakers = await Promise.all(data.others.map(async (stake, i) =>  {
      const nominatorStashAccount = stake.who;
      const nominatorControllerAccount =  await api.query.staking.bonded.at(blockHash, nominatorStashAccount);
      return {
        stashAccount: nominatorStashAccount.toString(),
        controllerAccount: (!nominatorControllerAccount.isEmpty) ? nominatorControllerAccount.toString() : null,
        stake: stake.value.toString(),
        isRewardEligible: i < maxNominatorRewardedPerValidator,
      }
    }))

    return {
      controllerAccount: (!validatorControllerAccount.isEmpty) ? validatorControllerAccount.toString() : null,
      commission: validatorCommission(erasValidatorPrefs, validatorStashAccount),
      stashAccount: validatorStashAccount,
      rewardPoints: (erasRewardPoints.individual.toJSON()[validatorStashAccount] || '0').toString(),
      stakers: stakers,
      sessionKeys: validatorSessionKeys(queuedKeys, validatorStashAccount),
      totalStake: data.total.toString(),
      ownStake: data.own.toString(),
      stakersStake: data.total - data.own,
    };
  })

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

const validatorCommission = (prefs, validatorStashAccount) => {
  const keysRow = prefs.find((row) => {
    const account = row[0].args[1];
    return account.toString() === validatorStashAccount
  })
  return keysRow ? keysRow[1].commission.toString() : null;
}

module.exports = {
  getByHeight,
};