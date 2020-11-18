const {getHashForHeight} = require('../utils/block');

const getAllByHeight = async (api, call, context = {}) => {
  const height = call.request.height;
  const blockHash = await getHashForHeight(api, height);

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
