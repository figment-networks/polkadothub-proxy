const {CalcFee} = require('@substrate/calc');
const { expandMetadata } = require('@polkadot/metadata/decorate');


// createCalcFee follows what parity does
// https://github.com/paritytech/substrate-api-sidecar/blob/6507ce70ff458281d1a2e31b58716e20ad8183dc/src/services/blocks/BlocksService.ts#L412
const createCalcFee = async(api, metadata, version, multiplier) => {
  const perByte = api.consts.transactionPayment?.transactionByteFee;
  const extrinsicBaseWeightExists =
    api.consts.system.extrinsicBaseWeight ||
    api.consts.system.blockWeights.perClass.normal.baseExtrinsic;

  if (
    perByte === undefined ||
    extrinsicBaseWeightExists === undefined ||
    typeof api.query.transactionPayment?.nextFeeMultiplier?.at !==
      'function'
  ) {
    return { calc_fee: () => null };
  }

  const specName = version.specName.toString();
  const specVersion = version.specVersion;
  const coefficients = api.consts.transactionPayment.weightToFee.map(
    (c) => {
      return {
        coeffInteger: c.coeffInteger.toString(10),
        coeffFrac: c.coeffFrac.toNumber(),
        degree: c.degree.toNumber(),
        negative: c.negative,
      };
    }
  );

  // TODO once https://github.com/polkadot-js/api/issues/2365 is resolved we can use that instead.
  let extrinsicBaseWeight;
  if (
    specName !== api.runtimeVersion.specName.toString() ||
    specVersion !== api.runtimeVersion.specVersion.toNumber()
  ) {
    const decorated = expandMetadata(api.registry, metadata);

    extrinsicBaseWeight =
      (decorated.consts.system
        ?.extrinsicBaseWeight) ||
      (decorated.consts.system
        ?.blockWeights).perClass
        ?.normal?.baseExtrinsic;
  } else {
    extrinsicBaseWeight =
      api.consts.system?.extrinsicBaseWeight ||
      api.consts.system.blockWeights.perClass?.normal
        ?.baseExtrinsic;
  }

  if (!extrinsicBaseWeight) {
    throw new InternalServerError(
      '`extrinsicBaseWeight` is not defined'
    );
  }

  return CalcFee.from_params(
    coefficients,
    extrinsicBaseWeight.toBigInt(),
    multiplier.toString(10),
    perByte.toString(10),
    specName,
    specVersion
  );
}

module.exports = {
  createCalcFee,
}
