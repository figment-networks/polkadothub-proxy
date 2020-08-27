const {fetchMetadataAtHeight, injectMetadata} = require('../utils/setup');
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

  const currHeightMetadata = context.currHeightMetadata ? context.currHeightMetadata : await fetchMetadataAtHeight(api, height);
  injectMetadata(api, currHeightMetadata);

  const {blockHash} = currHeightMetadata;

  const accountAt = await api.query.system.account.at(blockHash, address);
  const ledgerAt = await api.query.staking.ledger.at(blockHash, address);

  return accountMappers.toPb(accountAt, ledgerAt);
};

module.exports = {
  getIdentity,
  getByHeight,
};
