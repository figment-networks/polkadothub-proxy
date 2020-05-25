const {setupApiAtHeight} = require('../utils/setup');
const identityMappers = require('../mappers/account/identity_mappers');
const accountMappers = require('../mappers/account/account_mappers');

/**
 * Get identity by address
 */
const getIdentity = async (api, call) => {
  const address = call.request.address;

  const rawIdentity = await api.query.identity.identityOf(address);

  return identityMappers.toPb(rawIdentity);
}

/**
 * Get account by height
 */
const getByHeight = async (api, call) => {
  const height = call.request.height;
  const address = call.request.address;

  const {blockHash} = await setupApiAtHeight(api, height);

  const accountAt = await api.query.system.account.at(blockHash, address);
  const ledgerAt = await api.query.staking.ledger.at(blockHash, address);

  return accountMappers.toPb(accountAt, ledgerAt);
};

module.exports = {
  getIdentity,
  getByHeight,
};
