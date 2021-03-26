const {getHashForHeight} = require('../utils/block');
const {createCalcFee} = require("../utils/calc");
const {rollbar} = require('../utils/rollbar');
const {UnavailableError} = require('../utils/errors');
const blockMappers = require('../mappers/block/block_mappers');
const {Json} = require('@polkadot/types');

/**
 * decode a block
 */
const decode = async (api, call, context = {}) => {
    const byteBlock = call.request.block;
    // var block = JSON.stringify(byteBlock)

    const decodedBlock = new Json(api.registry, byteBlock);

    // const [rawTimestampAt, rawEventsAt] = await Promise.all([
    //     api.query.timestamp.now.at(blockHash),
    //     api.query.system.events.at(blockHash),
    // ]);

    // let calcFee;
    // try {
    //     calcFee = await createCalcFee(api, rawBlock.header.parentHash, rawBlock);
    // } catch(err) {
    //     rollbar.error(err, {call});
    //     throw new UnavailableError('could not calculate fee');
    // }

    // return blockMappers.toPb(blockHash, rawBlock, rawTimestampAt, rawEventsAt, calcFee);
};

module.exports = {
    decode,
};
