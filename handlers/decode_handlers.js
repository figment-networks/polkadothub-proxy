const {createCalcFee2} = require("../utils/calc");
const {rollbar} = require('../utils/rollbar');
const {UnavailableError} = require('../utils/errors');
const blockMappers = require('../mappers/block/block_mappers');
const {Metadata} = require('@polkadot/metadata');
const {Compact, Json,Int} = require('@polkadot/types');
const {Vec} = require('@polkadot/types/codec');
const {hexToBn, hexToU8a} = require("@polkadot/util");
const {getSpecTypes,getSpecHasher,getSpecExtensions,getSpecAlias} = require('@polkadot/types-known');
const {TypeRegistry } = require("@polkadot/types/create");


/**
 * decode a block
 */
const decode = async (api, call = {}) => {
    const registry = new TypeRegistry()
    registry.setChainProperties(api.registry.getChainProperties())

    const rawRuntimeParent = await parseByteJson(registry, call.request.runtimeParent);
    const types = getSpecTypes(registry, call.request.chain, rawRuntimeParent.specName, rawRuntimeParent.specVersion);
    registry.setKnownTypes(types);
    registry.register(types);
    if (registry.knownTypes.typesBundle) {
        registry.knownTypes.typesAlias =  getSpecAlias(registry, call.request.chain, rawRuntimeParent.specName);
    }

    const hasher = getSpecHasher(registry,call.request.chain, rawRuntimeParent.specName);
    registry.setHasher(hasher);

    const rawMetadataParent = new Metadata(registry, newBuffer( call.request.metadataParent));
    registry.setMetadata(rawMetadataParent, undefined, getSpecExtensions(registry,call.request.chain, rawRuntimeParent.specName));


    const [decodedBlock, rawCurrentEraParent,  rawMultiplier, rawTimestamp, rawEvents] = await Promise.all([
        parseByteJson(registry, call.request.block),
        decodeHexToBN(call.request.currentEraParent,{ isLe: true}),
        decodeHexToBN(call.request.nextFeeMultiplierParent,{ isLe: true, isNegative: true }),
        decodeHexToBN(call.request.timestamp,{ isLe: true }),
        decodeVec(registry, 'EventRecord', hexToU8a(newBuffer(call.request.events))),
    ]);

    const [decodedHeight, rawExtrinsics] = await Promise.all([
        decodeHeight(registry, decodedBlock.block.header.number),
        decodeVec(registry, 'Extrinsic' , decodedBlock.block.extrinsics),
    ]);

    rawEvents.forEach((rawEvent,i) => {
        rawEvents[i].error = getError(registry, call, rawEvent);
    });

    let calcFee;
    try {
        calcFee = await createCalcFee2(api, registry, rawMetadataParent, rawRuntimeParent, rawMultiplier);
    } catch(err) {
        rollbar.error(err, {call});
        throw new UnavailableError('could not calculate fee');
    }

    return {
        block: blockMappers.toPb(call.request.blockHash, decodedHeight, decodedBlock.block.header, rawExtrinsics, rawTimestamp, rawEvents, rawCurrentEraParent, calcFee),
        epoch: rawCurrentEraParent.toString(),
    };
};

const decodeHeight = async (registry, height) => {
    return new Compact(registry, 'BlockNumber', height).toNumber();
};

const decodeHexToBN = async (value, options) => {
    return hexToBn(newBuffer(value), options);
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


function getError(registry, call, rawEvents) {
    let errMsg;
    if ( rawEvents.event === undefined || rawEvents.event.data === undefined ) {
        return
    }
    rawEvents.event.data.forEach((data) => {
        if (data.isModule) {
            const module = data.asModule;
            try {
              const { documentation } =  registry.findMetaError(module);
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
