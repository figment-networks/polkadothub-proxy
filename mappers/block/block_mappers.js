const transactionMappers = require('../transaction/transaction_mappers');

const toPb = (rawBlock, rawTimestamp, rawEvents) => {
  return {
    block: {
      header: {
        time: {seconds: rawTimestamp.toNumber() / 1000, nanos: 0},
        parentHash: rawBlock.header.parentHash.toString(),
        height: rawBlock.header.number.toNumber(),
        stateRoot: rawBlock.header.stateRoot.toString(),
        extrinsicsRoot: rawBlock.header.extrinsicsRoot.toString(),
      },
      extrinsics: rawBlock.extrinsics.map((rawExtrinsic, index) => {
        return transactionMappers.toPb(index, rawExtrinsic, rawEvents)
      }),
    }
  };
}

module.exports = {
  toPb,
}
