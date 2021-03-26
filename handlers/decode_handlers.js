const {getHashForHeight} = require('../utils/block');
const {createCalcFee} = require("../utils/calc");
const {rollbar} = require('../utils/rollbar');
const {UnavailableError} = require('../utils/errors');
const blockMappers = require('../mappers/block/block_mappers');
const {GenericBlock} = require('@polkadot/types/generic');
const { Metadata } = require('@polkadot/metadata');
const { expandMetadata } = require('@polkadot/metadata/decorate');





/**
 * decode a block
 */
const decode = async (api, call, context = {}) => {

    const blockString  = new Buffer(call.request.block).toString('ascii');
    const bjson = JSON.parse(blockString)

    const rawBlock = new GenericBlock(api.registry, bjson.block)

    const metadataString  = new Buffer(call.request.events).toString('ascii');
    const metadata = new Metadata(api.registry, metadataString);
    const decoratedMeta = expandMetadata(api.registry, metadata);

    const [rawTimestampAt, rawEventsAt] = await Promise.all([
         api.query.timestamp.now.at("0x8036e20c9452ddfb8c9c615cc1cdced79408fab6dff3346818f0fefae1bfda15"),
         api.query.system.events.at("0x8036e20c9452ddfb8c9c615cc1cdced79408fab6dff3346818f0fefae1bfda15"),
    ]);

    // let calcFee;
    // try {
    //     calcFee = await createCalcFee(api, rawBlock.header.parentHash, rawBlock);
    // } catch(err) {
    //     rollbar.error(err, {call});
    //     throw new UnavailableError('could not calculate fee');
    // }

    return {
        block: blockMappers.toPb("0x8036e20c9452ddfb8c9c615cc1cdced79408fab6dff3346818f0fefae1bfda15", rawBlock, rawTimestampAt, rawEventsAt,undefined)
    }
};

module.exports = {
    decode,
};
