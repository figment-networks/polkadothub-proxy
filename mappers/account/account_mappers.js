const toPb = (rawAccount) => {

  return {
    account: {
      nonce: rawAccount.nonce.toNumber(),
      free: rawAccount.data.free.toString(),
      reserved: rawAccount.data.reserved.toString(),
      miscFrozen: rawAccount.data.miscFrozen.toString(),
      feeFrozen: rawAccount.data.feeFrozen.toString(),
    },
  };
}

module.exports = {
  toPb,
}
