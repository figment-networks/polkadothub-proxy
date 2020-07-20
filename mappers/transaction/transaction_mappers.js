const eventMappers = require('../event/event_mappers');

const toPb = (index, rawExtrinsic, rawTimestamp, rawEvents) => {
  const success = getSuccess(rawEvents, index);

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
    isSuccess: success,
  };
}

function getSuccess(rawEvents, index) {
  let success = false;
  for (let rawEvent of rawEvents) {
    const event = eventMappers.toPb(rawEvent);

    if (event.extrinsicIndex === index && event.section === 'system' && event.method === 'ExtrinsicSuccess') {
      success = true;
      break;
    }
  }
  return success;
}

module.exports = {
  toPb,
}
