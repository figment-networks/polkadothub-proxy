const transactionMappers = require('../transaction/transaction_mappers');

const toPb = (blockHash, rawBlock, rawTimestamp, rawEvents, rawCurrentEra, calcFee) => {
  const currentEra = rawCurrentEra.toString()

  return {
    block: {
      blockHash: blockHash.toString(),
      header: {
        time: {seconds: rawTimestamp.toNumber() / 1000, nanos: 0},
        parentHash: rawBlock.header.parentHash.toString(),
        height: rawBlock.header.number.toNumber(),
        stateRoot: rawBlock.header.stateRoot.toString(),
        extrinsicsRoot: rawBlock.header.extrinsicsRoot.toString(),
      },
      extrinsics: rawBlock.extrinsics.map((rawExtrinsic, index) => {
        const rawEventsForExtrinsic = rawEvents.filter((ev) => ev.phase.isApplyExtrinsic && ev.phase.asApplyExtrinsic.toNumber() === index);
        return transactionMappers.toPb(index, rawExtrinsic, rawTimestamp, rawEventsForExtrinsic, calcFee, currentEra)
      }),
    }
  };
}

module.exports = {
  toPb,
}
