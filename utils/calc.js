const {CalcFee} = require('@substrate/calc');

// createCalcFee returns a method to calculate a partial fee
// it is called "partial fee" because the total fee would include the tip field
const createCalcFee = async(api, parentHash, block) => {
    // Based on info from sidecar we need to use parent of parent here
    let parentParentHash;
    if (block.header.number.toNumber() > 1) {
      parentParentHash = (await api.rpc.chain.getHeader(parentHash))
        .parentHash;
    } else {
      parentParentHash = parentHash;
    }
    const perByte = api.consts.transactionPayment.transactionByteFee;
    const extrinsicBaseWeight = api.consts.system.extrinsicBaseWeight;
    const multiplier = await api.query.transactionPayment.nextFeeMultiplier.at(
      parentHash
    );
    const version = await api.rpc.state.getRuntimeVersion(parentParentHash);
    const specName = version.specName.toString();
    const specVersion = version.specVersion.toNumber();
    const coefficients = api.consts.transactionPayment.weightToFee.map(
      (c) => {
        return {
          coeffInteger: c.coeffInteger.toString(),
          coeffFrac: c.coeffFrac,
          degree: c.degree,
          negative: c.negative,
        };
      }
    );

    return CalcFee.from_params(
        coefficients,
        BigInt(extrinsicBaseWeight.toString()),
        multiplier.toString(),
        perByte.toString(),
        specName,
        specVersion
      );
  };

  module.exports = {
    createCalcFee,
  }
