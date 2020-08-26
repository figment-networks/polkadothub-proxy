const eventMappers = require('../event/event_mappers');

const toPb = (index, rawExtrinsic, rawTimestamp, rawEventsForExtrinsic) => {
  const successEvent = rawEventsForExtrinsic.find(({event}) =>
    event.section === 'system' && event.method === 'ExtrinsicSuccess'
  )

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
  };
}

module.exports = {
  toPb,
}
