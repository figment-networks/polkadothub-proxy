const transactionMappers = require('../transaction/transaction_mappers');

const toPb = (blockHash, blockHeight, rawHeader, rawExtrinsic, rawTimestamp, rawEvents, rawCurrentEra, calcFee) => {
  rawEvents.forEach((ev, i) => ev.index = i);
  const currentEra = rawCurrentEra.toString();
  
  return {
    block: {
      blockHash: blockHash.toString(),
      header: {
        time: {seconds: rawTimestamp.toNumber() / 1000, nanos: 0},
        parentHash: rawHeader.parentHash.toString(),
        height: blockHeight,
        stateRoot: rawHeader.stateRoot.toString(),
        extrinsicsRoot: rawHeader.extrinsicsRoot.toString(),
      },
      extrinsics: rawExtrinsic.map((rawExtrinsic, index) => {
        const rawEventsForExtrinsic = rawEvents.filter((ev) => ev.phase.isApplyExtrinsic && ev.phase.asApplyExtrinsic.toNumber() === index);
        return transactionMappers.toPb(index, rawExtrinsic, rawTimestamp, rawEventsForExtrinsic, calcFee, currentEra);
      }),
    }
  };
};

module.exports = {
  toPb,
};
