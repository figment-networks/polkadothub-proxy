const stakingMappers = require('../mappers/staking/staking_mappers');

/**
 * Get staking information by height
 */
const getByHeight = (api) => async (call, callback) => {
  const height = call.request.height;

  const blockHash = await api.rpc.chain.getBlockHash(height);

  const timestamp = await api.query.timestamp.now.at(blockHash);
  console.log('timestamp', timestamp.toNumber());

  const sessionAt = await api.query.session.currentIndex.at(blockHash);
  console.log('current session #: ', sessionAt.toString());

  const eraAt = await api.query.staking.currentEra.at(blockHash);
  console.log('currentEra: ', eraAt.toString());

  // ERA QUERIES
  const erasRewardPoints = await api.query.staking.erasRewardPoints(eraAt.toString());
  console.log('erasRewardPoints: ', erasRewardPoints.toString());

  const erasTotalStake = await api.query.staking.erasTotalStake(eraAt.toString());
  console.log('erasTotalStake: ', erasTotalStake.toString());

  // Validator reward for era
  const erasValidatorReward = await api.query.staking.erasValidatorReward(eraAt.toString());
  console.log('erasValidatorReward: ', erasValidatorReward.toString());


  const isLastInEra = false;
  const isLastInSession = false;
  const isNewEra = false;
  const isNewSession = false;


  const validatorsAt = await api.query.session.validators.at(blockHash);
  const validatorsData = [];
  for (const [index, rawValidator] of validatorsAt.entries()) {
    const validatorControllerAccount = rawValidator.toString();
    const validator = {
      controllerAccount: validatorControllerAccount,
      rewardPoints: (erasRewardPoints.individual.toJSON()[validatorControllerAccount] || '0').toString(),
      stakers: [],
    };

    // Get validator stash account
    const validatorStashAccount = await api.query.staking.bonded.at(blockHash, validatorControllerAccount);
    validator.stashAccount = validatorStashAccount.toString();

    // Get stakers for validator
    const erasStakers = await api.query.staking.erasStakers(eraAt.toString(), validatorControllerAccount);
    validator.totalStake = erasStakers.total.toString();
    validator.ownStake = erasStakers.own.toString();

    for (const stake of erasStakers.others) {
      const nominatorControllerAccount = stake.who.toString();

      // Get nominator stash account
      const nominatorStashAccount = await api.query.staking.bonded.at(blockHash, nominatorControllerAccount);

      validator.stakers.push({
        stashAccount: nominatorStashAccount.toString(),
        controllerAccount: nominatorControllerAccount,
        amount: stake.value.toString(),
      })
    }

    // Get Validator prefs (commission)
    const erasValidatorPrefs = await api.query.staking.erasValidatorPrefs(eraAt.toString(), validatorControllerAccount);
    validator.commission = erasValidatorPrefs.commission.toString();

    // Get Validator online/offline state
    // TODO: replace blockHash with a hash of last blockHash in a session, or it will show offline: false for first half of session
    const authoredBlocks = await api.query.imOnline.authoredBlocks.at(blockHash, sessionAt, rawValidator.toString());
    if (authoredBlocks > 0) { // if validator authored a block, it was online during the whole session
      validator.online = true
    } else {
      const receivedHeartbeats = await api.query.imOnline.receivedHeartbeats.at(blockHash, sessionAt, index);
      validator.online = !!receivedHeartbeats.toHuman() // if validator sent a heartbeat, it was online
    }

    validatorsData.push(validator);
  }

  const response = {
    staking: {
      session: sessionAt.toString(),
      era: eraAt.toString(),
      totalStake: erasTotalStake.toString(),
      totalRewards: erasValidatorReward.toString(),
      totalRewardPoints: erasRewardPoints.total.toString(),
      validators: validatorsData,
    },
  };

  callback(null, response);
};

module.exports = {
  getByHeight,
};
