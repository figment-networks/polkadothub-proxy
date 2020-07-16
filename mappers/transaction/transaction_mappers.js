const eventMappers = require('../event/event_mappers');

const toPb = (index, rawExtrinsic, rawEvents) => {
  let success = false;
  for (let rawEvent of rawEvents) {
    const event = eventMappers.toPb(rawEvent);

    if (event.extrinsicIndex === index && event.section === 'system' && event.method === 'ExtrinsicSuccess') {
      success = true;
      break;
    }
  }

  return {
    extrinsicIndex: index,
    hash: rawExtrinsic.hash.toString(),
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

module.exports = {
  toPb,
}
