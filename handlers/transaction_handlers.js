const {getHashForHeight} = require('../utils/block');
const {createCalcFee} = require("../utils/calc");
const {UnavailableError} = require('../utils/errors');
const {rollbar} = require('../utils/rollbar');
const transactionMappers = require('../mappers/transaction/transaction_mappers');

var {callDurationHistogram,calculateTime} = require('./metrics')

/**
 * Get signed transactions by height
 */
const getByHeight = async (api, call, context = {}) => {
  const hrstart = process.hrtime()
  const height = parseInt(call.request.height, 10);
  const blockHash = context.blockHash ? context.blockHash : await getHashForHeight(api, height);
  callDurationHistogram.labels('getHashForHeight').observe(calculateTime(hrstart));
  const prevBlockHash = context.prevBlockHash ? context.prevBlockHash : (height > 1 ? await getHashForHeight(api, height-1) : blockHash);
  let parentParentHash = prevBlockHash;
  if (height > 1) {
    parentParentHash = (await api.rpc.chain.getHeader(prevBlockHash)).parentHash;
  }

  const [rawBlock, rawTimestampAt, rawEventsAt, rawCurrentEra, rawMetadata, rawVersion, rawMultiplier] = await Promise.all([
    api.rpc.chain.getBlock(blockHash),
    api.query.timestamp.now.at(blockHash),
    api.query.system.events.at(blockHash),
    api.query.staking.currentEra.at(prevBlockHash),
    api.rpc.state.getMetadata(parentParentHash),
    api.rpc.state.getRuntimeVersion(parentParentHash),
    api.query.transactionPayment.nextFeeMultiplier.at(prevBlockHash),
  ]);

  const currentEra = rawCurrentEra.toString();
  const rawBlockAt = rawBlock.block;

  let calcFee;
  try {
    calcFee = await createCalcFee(api,api.registry, rawMetadata, rawVersion, rawMultiplier);
  } catch(err) {
    rollbar.error(err, {call});
    throw new UnavailableError('could not calculate fee');
  }

  const transactions = [];
  rawBlockAt.extrinsics.forEach(async (rawExtrinsic, index) => {
    if (rawExtrinsic.toHuman().isSigned) {
      const rawEventsForExtrinsic = rawEventsAt.filter((ev) => ev.phase.isApplyExtrinsic && ev.phase.asApplyExtrinsic.toNumber() === index);
      transactions.push(transactionMappers.toPb(index, rawExtrinsic, rawTimestampAt, rawEventsForExtrinsic, calcFee, currentEra));
    }
  });

  return {transactions};
};


const getAnnotatedByHeight = async (api, call, context = {}) => {

  const hrstart = process.hrtime()
  const blockHash = await getHashForHeight(api, call.request.height);
  callDurationHistogram.labels('getHashForHeight').observe(calculateTime(hrstart));

  const resp = await api.rpc.chain.getBlock(blockHash);
  const rawBlockAt = resp.block;

  const transactions = rawBlockAt.extrinsics.map((rawExtrinsic, index) => {
    return {
      extrinsicIndex: index,
      hash: rawExtrinsic.hash.toString(),
      isSigned: rawExtrinsic.toHuman().isSigned,
      method: rawExtrinsic.toHuman().method.method.toString(),
      args: JSON.stringify(rawExtrinsic.toHuman().method.args),
      section: rawExtrinsic.toHuman().method.section.toString(),
    }
  });

  return {transactions};
};


module.exports = {
  getByHeight,
  getAnnotatedByHeight,
};
