const toPb = (rawEvents, rewardPoints, erasValidatorReward) => {
  const individualRewardPoints = [];
  for(let key in rewardPoints.individual) {
    if (rewardPoints.individual.hasOwnProperty(key)) {
      individualRewardPoints.push({
        stash: key.toString(),
        amount: rewardPoints.individual[key].toString(),
      })
    }
  }


  return {
    staking: {
      rewardPoints: {
        total: rewardPoints.total.toString(),
        individual: individualRewardPoints,
      },
      validatorReward: erasValidatorReward,
    }
  };
}

module.exports = {
  toPb,
}
