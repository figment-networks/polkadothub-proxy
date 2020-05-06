const toPb = (rawAccount, rawLedger) => {
  console.log("RAW", rawAccount);

  return {
    account: {
      nonce: rawAccount.nonce.toNumber(),
      referendumCount: rawAccount.refcount.toNumber(),
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
