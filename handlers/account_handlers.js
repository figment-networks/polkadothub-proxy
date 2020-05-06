const {setupApiAtHeight} = require('../utils/setup');
const identityMappers = require('../mappers/account/identity_mappers');
const accountMappers = require('../mappers/account/account_mappers');

/**
 * Get identity by address
 */
const getIdentity = (api) => async (call, callback) => {
  const address = call.request.address;

  const rawIdentity = await api.query.identity.identityOf(address);

  callback(null, identityMappers.toPb(rawIdentity));
}

/**
 * Get account by height
 */
const getByHeight = (api) => async (call, callback) => {
  const height = call.request.height;
  const address = call.request.address;

  const blockHash = await setupApiAtHeight(api, height);

  const accountAt = await api.query.system.account.at(blockHash, address);
  const ledgerAt = await api.query.staking.ledger.at(blockHash, address);

  callback(null, accountMappers.toPb(accountAt, ledgerAt));
};

module.exports = {
  getIdentity,
  getByHeight,
};
