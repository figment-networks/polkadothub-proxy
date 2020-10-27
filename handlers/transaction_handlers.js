const {fetchMetadataAtHeight, injectMetadata} = require('../utils/setup');
const {createCalcFee} = require("../utils/calc");
const {UnavailableError} = require('../utils/errors');
const transactionMappers = require('../mappers/transaction/transaction_mappers');

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

  const [rawTimestampAt, rawEventsAt] = await Promise.all([
    api.query.timestamp.now.at(blockHash),
    api.query.system.events.at(blockHash),
  ]);

  let calcFee;
  try {
    calcFee = await createCalcFee(api, rawBlockAt.header.parentHash, rawBlockAt);
  } catch(err) {
    rollbar.error(err, {call});
    throw new UnavailableError('could not calculate fee');
  }

  const transactions = [];

  rawBlockAt.extrinsics.forEach(async (rawExtrinsic, index) => {
    if (rawExtrinsic.toHuman().isSigned) {
      const rawEventsForExtrinsic = rawEventsAt.filter((ev) => ev.phase.isApplyExtrinsic && ev.phase.asApplyExtrinsic.toNumber() === index);
      transactions.push(transactionMappers.toPb(index, rawExtrinsic, rawTimestampAt, rawEventsForExtrinsic, calcFee));
    }
  });

  return {transactions};
};


const getAnnotatedByHeight = async (api, call, context = {}) => {
  const height = call.request.height;

  const currHeightMetadata = context.currHeightMetadata ? context.currHeightMetadata : await fetchMetadataAtHeight(api, height);
  injectMetadata(api, currHeightMetadata);

  const {blockHash} = currHeightMetadata;

  const resp = await api.rpc.chain.getBlock(blockHash);
  const rawBlockAt = resp.block;

  const transactions = rawBlockAt.extrinsics.map((rawExtrinsic, index) => {
    return {
      extrinsicIndex: index,
      hash: rawExtrinsic.hash.toString(),
      isSigned: rawExtrinsic.toHuman().isSigned,
      method: rawExtrinsic.toHuman().method.method.toString(),
      section: rawExtrinsic.toHuman().method.section.toString(),
    }
  });

  return {transactions};
};


module.exports = {
  getByHeight,
  getAnnotatedByHeight,
};
