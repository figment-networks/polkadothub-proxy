const toPb = (block, timestamp) => {
  return {
    block: {
      header: {
        timestamp: {seconds: timestamp.toNumber() / 1000, nanos: 0},
        parentHash: block.header.parentHash.toString(),
        number: block.header.number.toNumber(),
        stateRoot: block.header.stateRoot.toString(),
        extrinsicsRoot: block.header.extrinsicsRoot.toString(),
      },
      extrinsics: block.extrinsics.map((rawExtrinsic, index) => {
        return {
          extrinsicIndex: index,
          isSignedTransaction: rawExtrinsic.toHuman().isSigned,
          signature: rawExtrinsic.signature.toString(),
          signer: rawExtrinsic.signer.toString(),
          nonce: rawExtrinsic.nonce.toNumber(),
          method: rawExtrinsic.toHuman().method.method.toString(),
          section: rawExtrinsic.toHuman().method.section.toString(),
          args: rawExtrinsic.method.args.toString(),
        }
      }),
    }
  };
}

module.exports = {
  toPb,
}
