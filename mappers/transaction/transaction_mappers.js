const eventMappers = require('../event/event_mappers');

const toPb = (index, rawExtrinsic, rawTimestamp, rawEventsForExtrinsic, calcFee) => {
    const successEvent = rawEventsForExtrinsic.find(({ event }) =>
        event.section === 'system' && event.method === 'ExtrinsicSuccess'
    );

    const events = rawEventsForExtrinsic.map((rawEvent, index) => ({index, ...eventMappers.toPb(rawEvent)}));
    const partialFee = getPartialFee(rawExtrinsic, events, calcFee);
    
    return {
        extrinsicIndex: index,
        hash: rawExtrinsic.hash.toString(),
        time: rawTimestamp.toNumber() / 1000,
        isSignedTransaction: rawExtrinsic.toHuman().isSigned,
        signature: rawExtrinsic.signature.toString(),
        signer: rawExtrinsic.signer.toString(),
        nonce: rawExtrinsic.nonce.toNumber(),
        method: rawExtrinsic.toHuman().method.method.toString(),
        section: rawExtrinsic.toHuman().method.section.toString(),
        args: rawExtrinsic.method.args.toString(),
        isSuccess: !!successEvent,
        partialFee: partialFee,
        tip: rawExtrinsic.tip,
        raw: JSON.stringify(rawExtrinsic.toHuman()),
        events: events,
    };
}

const getPartialFee = (rawExtrinsic, events, calcFee) => {
    // Polkadot doesn't charge a fee for unsigned transactions https://wiki.polkadot.network/docs/en/learn-transaction-fees
    if (!rawExtrinsic.isSigned || !calcFee) {
        return
    }

    const completedEvent = events.find(({ section, method }) =>
        section == 'system' && (method === 'ExtrinsicSuccess' || method === 'ExtrinsicFailed')
    );

    const dispatchInfo = completedEvent && completedEvent.data && completedEvent.data.find(({ name }) => name == 'DispatchInfo');
    if (!dispatchInfo) {
        return
    }

    const paysFee = JSON.parse(dispatchInfo.value).paysFee;
    const weight = JSON.parse(dispatchInfo.value).weight;

    if (!weight || !(paysFee === "Yes" || paysFee === true)) {
        return
    }

    return calcFee.calc_fee(
        BigInt(weight.toString()),
        rawExtrinsic.encodedLength
    );
}

module.exports = {
    toPb,
}