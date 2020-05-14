/**
 * Get validator performance information by height
 */
const getByHeight = (api) => async (call, callback) => {
  const height = call.request.height;

  const blockHash = await api.rpc.chain.getBlockHash(height);

  const sessionAt = await api.query.session.currentIndex.at(blockHash);
  console.log('current session #: ', sessionAt.toString());

  const validatorsAt = await api.query.session.validators.at(blockHash);
  const validatorsData = [];
  for (const [index, rawValidator] of validatorsAt.entries()) {
    const validatorControllerAccount = rawValidator.toString();
    const validator = {
      controllerAccount: validatorControllerAccount,
    };

    // Get Validator online/offline state
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
    validators: validatorsData,
  };

  callback(null, response);
};

module.exports = {
  getByHeight,
};
