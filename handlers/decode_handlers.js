const {createCalcFee, getExtrinsicBaseWeight} = require("../utils/calc");
const {rollbar} = require('../utils/rollbar');
const {UnavailableError} = require('../utils/errors');
const blockMappers = require('../mappers/block/block_mappers');
const {Metadata} = require('@polkadot/metadata');
const {Compact, Json} = require('@polkadot/types');
const {Vec} = require('@polkadot/types/codec');
const {hexToBn, hexToU8a} = require("@polkadot/util");
const {getSpecTypes,getSpecHasher,getSpecExtensions,getSpecAlias} = require('@polkadot/types-known');
const {TypeRegistry } = require("@polkadot/types/create");


const {moduleHasIndexAndError} =  require("./event_handlers");

const {RegistryCache } = require("../utils/registry_cache");



/**
 * decode a block
 */
const decode = async (api, call = {}) => {

    let registry = new TypeRegistry();
    registry.setChainProperties(api.registry.getChainProperties())
    const rawRuntimeParent = await parseByteJson(registry, call.request.runtimeParent);
    let rawMetadataParent;
    const key = call.request.chain + "-"+ rawRuntimeParent.specName + "-" + rawRuntimeParent.specVersion
    if (!RegistryCache.has(key)) {
        const types = getSpecTypes(registry, call.request.chain, rawRuntimeParent.specName, rawRuntimeParent.specVersion);
        registry.setKnownTypes(types);
        registry.register(types);
        if (registry.knownTypes.typesBundle) {
            registry.knownTypes.typesAlias =  getSpecAlias(registry, call.request.chain, rawRuntimeParent.specName);
        }

        const hasher = getSpecHasher(registry,call.request.chain, rawRuntimeParent.specName);
        registry.setHasher(hasher);

        rawMetadataParent = new Metadata(registry, newBuffer( call.request.metadataParent));
        registry.setMetadata(rawMetadataParent, undefined, getSpecExtensions(registry,call.request.chain, rawRuntimeParent.specName));
        RegistryCache.set(key+"-metadata", rawMetadataParent)
        RegistryCache.set(key, registry)
    } else {
        registry = RegistryCache.get(key)
        rawMetadataParent =  RegistryCache.get(key+"-metadata")
    }

    const rawEvents = new Vec(registry, 'EventRecord' , hexToU8a(newBuffer(call.request.events)));
    const rawCurrentEraParent = hexToBn(newBuffer(call.request.currentEraParent),{ isLe: true});
    const rawMultiplier = hexToBn(newBuffer(call.request.nextFeeMultiplierParent),{ isLe: true, isNegative: true });
    const rawTimestamp = hexToBn(newBuffer(call.request.timestamp),{ isLe: true });

    const decodedBlock = await parseByteJson(registry, call.request.block);
    const decodedHeight =  new Compact(registry, 'BlockNumber', decodedBlock.block.header.number).toNumber();
    const rawExtrinsics = new Vec(registry, 'Extrinsic' , decodedBlock.block.extrinsics);

    rawEvents.forEach((rawEvent,i) => {
        rawEvents[i].error = getError(registry, call, rawEvent);
    });

    let calcFee;
    let baseWeight;
    try {
        calcFee = await createCalcFee(api, rawRuntimeParent, rawMultiplier);
        baseWeight = getExtrinsicBaseWeight(api, registry, rawMetadataParent, rawRuntimeParent);
    } catch(err) {
        rollbar.error(err, {call});
        throw new UnavailableError('could not calculate fee: '+ err.message);
    }

    return {
        block: blockMappers.toPb(call.request.blockHash, decodedHeight, decodedBlock.block.header, rawExtrinsics, rawTimestamp, rawEvents, rawCurrentEraParent, calcFee, baseWeight),
        epoch: rawCurrentEraParent.toString(),
    };
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
                errMsg = `{"index":${module.index.words[0]},"error":${module.error.words[0]}}`;
              }
            }
          }
    });

    return errMsg;
  }


module.exports = {
    decode,
};
