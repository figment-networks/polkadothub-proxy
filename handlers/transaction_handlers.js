const {fetchMetadataAtHeight, injectMetadata} = require('../utils/setup');
const { CalcFee } = require('@substrate/calc');
const transactionMappers = require('../mappers/transaction/transaction_mappers');
const eventMappers = require('../mappers/event/event_mappers');

/**
 * Get signed transactions by height
 */
const getByHeight = async (api, call, context = {}) => {
  const height = call.request.height;

  const currHeightMetadata = context.currHeightMetadata ? context.currHeightMetadata : await fetchMetadataAtHeight(api, height);
  injectMetadata(api, currHeightMetadata);

  const {blockHash} = currHeightMetadata;

  const resp = await api.rpc.chain.getBlock(blockHash);
  const rawBlockAt = resp.block;

  const rawTimestampAt = await api.query.timestamp.now.at(blockHash);
  const rawEventsAt = await api.query.system.events.at(blockHash);
  const calcFee = await createCalcFee(api, rawBlockAt);

  const transactions = [];

  rawBlockAt.extrinsics.forEach(async (rawExtrinsic, index) => {
    if (!rawExtrinsic.toHuman().isSigned) {
      return
    }
    const rawEventsForExtrinsic = rawEventsAt.filter((ev) => ev.phase.isApplyExtrinsic && ev.phase.asApplyExtrinsic.toNumber() === index);
    const completedRawEvent =  rawEventsForExtrinsic.find(({ event }) =>
        event.section == 'system' && (event.method === 'ExtrinsicSuccess' || event.method === 'ExtrinsicFailure')
    );

    var fee;
    if (calcFee && completedRawEvent) {
      const completedEvent =  eventMappers.toPb(completedRawEvent);
      const weightInfo = completedEvent.data.find(({name}) => name == "DispatchInfo")
      const weight = JSON.parse(weightInfo.value).weight;
      const partialFee = calcFee.calc_fee(
        BigInt(weight.toString()),
        rawExtrinsic.encodedLength
      );

      fee = partialFee // todo add tip for full fee
    }

      transactions.push(transactionMappers.toPb(index, rawExtrinsic, rawTimestampAt, rawEventsForExtrinsic));
  });

  return {transactions};
};


const createCalcFee = async(api, block) => {
  const { parentHash } = block.header;
  const perByte = api.consts.transactionPayment.transactionByteFee;
  const extrinsicBaseWeight = api.consts.system.extrinsicBaseWeight;
  const multiplier = await api.query.transactionPayment.nextFeeMultiplier.at(
    parentHash
  );
  const version = await api.rpc.state.getRuntimeVersion(parentHash); // TODO pass this?
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
  getByHeight,
};