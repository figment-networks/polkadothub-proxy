const {createCalcFee} = require("../utils/calc");
const {rollbar} = require('../utils/rollbar');
const {UnavailableError} = require('../utils/errors');
const blockMappers = require('../mappers/block/block_mappers');
const {Json} = require('@polkadot/types');

/**
 * decode a block
 */
const decode = async (api, call = {}) => {
    var blockHash = call.request.block_hash;
    var parentHash = call.request.parent_hash;
    const [decodedBlock, decodedEvents, decodedTimestamp, decodedMetadataParent, decodedVersion, decodedMultiplier] = await Promise.all([
        decodeByteJson(api.registry, call.request.block),
        decodeByteJson(api.registry, call.request.events),
        decodeByteJson(api.registry, call.request.timestamp),
        decodeByteJson(api.registry, call.request.metadata_parent),
        decodeByteJson(api.registry, call.request.runtime_parent),
    ]);

    var rawBlock = decodedBlock.block;
    var rawEvents = decodedEvents.events;
    var rawMetadata = decodedMetadataParent.metadata;
    var rawMultiplier = decodedMultiplier.multiplier;
    var rawTimestamp = decodedTimestamp.timestamp;
    var rawVersion = decodedVersion.runtime;
    
    let calcFee;
    try {
        calcFee = await createCalcFee(api, rawMetadata, rawVersion, rawMultiplier);
    } catch(err) {
        rollbar.error(err, {call});
        throw new UnavailableError('could not calculate fee');
    }

    return {
        block: blockMappers.toPb(blockHash, rawBlock, rawTimestamp, rawEvents, calcFee)
    }
};

const decodeByteJson = async(registry, byte) => {
    const json = JSON.parse(byte.toString());
    return new Json(registry, json);
}

module.exports = {
    decode,
};
