const {getHashForHeight} = require('../utils/block');
var {callDurationHistogram,calculateTime} = require('./metrics')

const getAllByHeight = async (api, call, context = {}) => {
  const height = call.request.height;

  const hrstart = process.hrtime()
  const blockHash = await getHashForHeight(api, height);
  callDurationHistogram.labels('getHashForHeight').observe(calculateTime(hrstart));

  const validators = await api.query.session.validators.at(blockHash)

    if (!validators.length) {
        return {validators: []}
    }

    const validatorBalances = await Promise.all(
        validators.map((address) =>
            api.query.system.account.at(blockHash, address)
        )
    );

    return {
        validators: validators.map((address, index) => ({
            stashAccount: address.toHuman(),
            balance: validatorBalances[index].data.free.toString(),
      })),
    }
};

module.exports = {
    getAllByHeight
};
