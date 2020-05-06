const toPb = (rawExtrinsic) => {
  return {
    signature: rawExtrinsic.signature.toString(),
    signer: rawExtrinsic.signer.toString(),
    nonce: rawExtrinsic.nonce.toNumber(),
    method: rawExtrinsic.toHuman().method.method.toString(),
    section: rawExtrinsic.toHuman().method.section.toString(),
    args: rawExtrinsic.method.args.toString(),
  };
}

module.exports = {
  toPb,
}
