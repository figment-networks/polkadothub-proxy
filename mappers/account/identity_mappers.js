const {hexToString} = require('@polkadot/util');

const toPb = (rawIdentity) => {
  if (rawIdentity.isEmpty) {
    return {identity: null};
  }

  const unwrappedIdentity = rawIdentity.unwrap();

  const identity = {
    deposit: unwrappedIdentity.deposit.toString(),
  }

  if (unwrappedIdentity.info.display.isRaw) {
    identity.displayName = hexToString(unwrappedIdentity.info.display.toHex());
  }

  if (unwrappedIdentity.info.legal.isRaw) {
    identity.legalName = hexToString(unwrappedIdentity.info.legal.toHex());
  }

  if (unwrappedIdentity.info.web.isRaw) {
    identity.webName = hexToString(unwrappedIdentity.info.web.toHex());
  }

  if (unwrappedIdentity.info.riot.isRaw) {
    identity.riotName = hexToString(unwrappedIdentity.info.riot.toHex());
  }

  if (unwrappedIdentity.info.email.isRaw) {
    identity.emailName = hexToString(unwrappedIdentity.info.email.toHex());
  }

  if (unwrappedIdentity.info.twitter.isRaw) {
    identity.twitterName = hexToString(unwrappedIdentity.info.twitter.toHex());
  }

  if (!unwrappedIdentity.info.image.isEmpty) {
    identity.image = unwrappedIdentity.info.image.toString();
  }

  return {identity};
}

module.exports = {
  toPb,
}
