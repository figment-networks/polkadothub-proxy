const {getHashForHeight} = require('../utils/block');
const identityMappers = require('../mappers/account/identity_mappers');
const accountMappers = require('../mappers/account/account_mappers');

/**
 * Get identity by address
 */
const getIdentity = async (api, call, context = {}) => {
  const address = call.request.address;

  const rawIdentity = await api.query.identity.identityOf(address);

  return identityMappers.toPb(rawIdentity);
}

/**
 * Get account by height
 */
const getByHeight = async (api, call, context = {}) => {
  const height = call.request.height;
  const address = call.request.address;
  const blockHash = await getHashForHeight(api, height);

  const [
    accountAt,
  ] = await Promise.all([
       api.query.system.account.at(blockHash, address),
  ]);

  return accountMappers.toPb(accountAt);
};

module.exports = {
  getIdentity,
  getByHeight,
};
