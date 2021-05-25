const transactionMappers = require('../transaction/transaction_mappers');
const eventMappers = require('../event/event_mappers');


const toPb = (blockHash, blockHeight, rawHeader, rawExtrinsic, rawTimestamp, rawEvents, rawCurrentEra, calcFee, baseWeight) => {
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
        const events = rawEventsForExtrinsic.map((rawEvent) => ({
          index: rawEvent.index,
          error: rawEvent.error,
          ...eventMappers.toPb(rawEvent)
         }));
         const partialFee = getPartialFee(rawExtrinsic, events, calcFee, baseWeight);

        return transactionMappers.toPb(index, rawExtrinsic, rawTimestamp, rawEventsForExtrinsic, partialFee, currentEra, events);
      }),
    }
  };
};


const getPartialFee = (rawExtrinsic, events, calcFee, baseWeight) => {
    // Polkadot doesn't charge a fee for unsigned transactions https://wiki.polkadot.network/docs/en/learn-transaction-fees
    if (!rawExtrinsic.isSigned || !calcFee) {
        return
    }

    const completedEvent = events.find(({ section, method }) =>
        section == 'system' && (method === 'ExtrinsicSuccess' || method === 'ExtrinsicFailed')
    );

    const dispatchInfo = completedEvent && completedEvent.data && completedEvent.data.find(({ name }) => name == 'DispatchInfo');
    if (!dispatchInfo) {
        return
    }

    const paysFee = JSON.parse(dispatchInfo.value).paysFee;
    const weight = JSON.parse(dispatchInfo.value).weight;

    if (!weight || !(paysFee === "Yes" || paysFee === true)) {
        return
    }

    return calcFee.calc_fee(BigInt(weight.toString()), rawExtrinsic.encodedLength, baseWeight);
}

module.exports = {
  toPb,
};
