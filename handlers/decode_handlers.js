const {createCalcFee} = require("../utils/calc");
const {rollbar} = require('../utils/rollbar');
const {UnavailableError} = require('../utils/errors');
const blockMappers = require('../mappers/block/block_mappers');
const {Metadata} = require('@polkadot/metadata');
const {Compact, Json} = require('@polkadot/types');
const {Vec} = require('@polkadot/types/codec');
const {hexToBn, hexToU8a} = require("@polkadot/util");
const {getSpecTypes} = require('@polkadot/types-known');

/**
 * decode a block
 */
const decode = async (api, call = {}) => {
    const registry = api.registry;

    const [decodedBlock, rawCurrentEraParent, rawRuntimeParent, rawMetadataParent, rawMultiplier, rawTimestamp] = await Promise.all([
        parseByteJson(registry, call.request.block),
        decodeHexToBN(call.request.currentEraParent),
        parseByteJson(registry, call.request.runtimeParent),
        decodeMetadata(registry, call.request.metadataParent),
        decodeHexToBN(call.request.nextFeeMultiplierParent),
        decodeHexToBN(call.request.timestamp),
    ]);

    const blockHash = call.request.blockHash;
    const rawBlock = decodedBlock.block;
    const metaRegistry = rawMetadataParent.registry;

    const types = getSpecTypes(registry, call.request.chain, rawRuntimeParent.specName, rawRuntimeParent.specVersion);
    api.registerTypes(types);


    const [decodedHeight, rawExtrinsics, rawEvents] = await Promise.all([
        decodeHeight(metaRegistry, rawBlock.header.number),
        decodeVec(metaRegistry, 'Extrinsic' , decodedBlock.block.extrinsics),
        decodeVec(metaRegistry, 'EventRecord', hexToU8a(newBuffer(call.request.events))),
    ]);

    rawEvents.forEach((rawEvent,i) => {
        rawEvents[i].error = getError(api, call, rawEvent);
    });

    let calcFee;
    try {
        calcFee = await createCalcFee(api, rawMetadataParent, rawRuntimeParent, rawMultiplier);
    } catch(err) {
        rollbar.error(err, {call});
        throw new UnavailableError('could not calculate fee');
    }

    return {
        block: blockMappers.toPb(blockHash, decodedHeight, rawBlock.header, rawExtrinsics, rawTimestamp, rawEvents, rawCurrentEraParent, calcFee),
        epoch: rawCurrentEraParent.toString(),
    };
};

const decodeHeight = async (registry, height) => {
    return new Compact(registry, 'BlockNumber', height).toNumber();
};

const decodeHexToBN = async (value) => {
    return hexToBn(newBuffer(value), { isLe: true });
};

const decodeMetadata = async (registry, metadata) => {
    return new Metadata(registry, newBuffer(metadata));
};

const decodeVec = async (registry, type, value) => {
    return new Vec(registry, type, value);
};

const newBuffer = (buffer) => {
    return new Buffer.from(buffer).toString('ascii');
};

const parseByteJson = async (registry, byte) => {
    const jsonStr = `{${byte.toString()}}`;
    const json = JSON.parse(jsonStr);
    return new Json(registry, json);
};


function getError(api, call, rawEvents) {
    let errMsg;
    if ( rawEvents.event === undefined || rawEvents.event.data === undefined ) {
        return
    }
    rawEvents.event.data.forEach((data) => {
        if (data.isModule) {
            const module = data.asModule;
            try {
              const { documentation } = api.registry.findMetaError(module);
              if ( Array.isArray(documentation) && documentation.length > 0) {
                errMsg = documentation[0];
              }
            } catch (error) {
              rollbar.error(error, {call})
              if (moduleHasIndexAndError(module)) {
                errMsg = `{"index":${data.asModule.index.words[0]},"error":${data.asModule.error.words[0]}}`;
              }
            }
          }
    });

    return errMsg;
  }


module.exports = {
    decode,
};
