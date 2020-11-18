const {fetchMetadataAtHeight, injectMetadata} = require('../utils/setup');


const getAllByHeight = async (api, call, context = {}) => {
  const height = call.request.height;

  const currHeightMetadata = context.currHeightMetadata ? context.currHeightMetadata : await fetchMetadataAtHeight(api, height);
  injectMetadata(api, currHeightMetadata);


  const validators = await api.query.staking.validators.entries()

    if (!validators.length) {
        return {validators: []}
    }

    const validatorBalances = await Promise.all(
        validators.map(([{ args: [address] }]) => 
            api.query.system.account(address.toHuman())
        )
    );

    return {
        validators: validators.map(([{ args: [address] }, data], index) => ({
            stashAccount: address.toHuman(),
            balance: validatorBalances[index].data.free.toString(),
            commission: data.commission.toString(),
      })),
    }
};

module.exports = {
    getAllByHeight
};
