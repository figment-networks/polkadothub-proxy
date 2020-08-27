const eventMappers = require('../event/event_mappers');

const toPb = (index, rawExtrinsic, rawTimestamp, rawEventsForExtrinsic, calcFee) => {
  const successEvent = rawEventsForExtrinsic.find(({event}) =>
    event.section === 'system' && event.method === 'ExtrinsicSuccess'
  );

  const partialFee = getPartialFee(rawExtrinsic, rawEventsForExtrinsic,calcFee);

  return {
    extrinsicIndex: index,
    hash: rawExtrinsic.hash.toString(),
    time: {seconds: rawTimestamp.toNumber() / 1000, nanos: 0},
    isSignedTransaction: rawExtrinsic.toHuman().isSigned,
    signature: rawExtrinsic.signature.toString(),
    signer: rawExtrinsic.signer.toString(),
    nonce: rawExtrinsic.nonce.toNumber(),
    method: rawExtrinsic.toHuman().method.method.toString(),
    section: rawExtrinsic.toHuman().method.section.toString(),
    args: rawExtrinsic.method.args.toString(),
    isSuccess: !!successEvent,
    partialFee: partialFee,
    tip: rawExtrinsic.tip,
  };
}

const getPartialFee = (rawExtrinsic, rawEventsForExtrinsic, calcFee) => {
  var fee;

  // Polkadot doesn't charge a fee for unsigned transactions https://wiki.polkadot.network/docs/en/learn-transaction-fees
  if (!rawExtrinsic.toHuman().isSigned) {
    return
  }

  const completedRawEvent =  rawEventsForExtrinsic.find(({ event }) =>
    event.section == 'system' && (event.method === 'ExtrinsicSuccess' || event.method === 'ExtrinsicFailure')
  );

  if (calcFee && completedRawEvent) {
    const completedEvent =  eventMappers.toPb(completedRawEvent);
    const weightInfo = completedEvent.data.find(({name}) => name == 'DispatchInfo')
    const weight = JSON.parse(weightInfo.value).weight;
    const partialFee = calcFee.calc_fee(
      BigInt(weight.toString()),
      rawExtrinsic.encodedLength
    );

    fee = partialFee
  }

  return fee
}

module.exports = {
  toPb,
}
