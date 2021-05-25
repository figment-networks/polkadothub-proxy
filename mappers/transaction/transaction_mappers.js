
const toPb = (index, rawExtrinsic, rawTimestamp, rawEventsForExtrinsic, partialFee, currentEra, events) => {
    const successEvent = rawEventsForExtrinsic.find(({ event }) =>
        event.section === 'system' && event.method === 'ExtrinsicSuccess'
    );
   var callArgs = getCallArgs(rawExtrinsic.method.args);

    return {
        extrinsicIndex: index,
        epoch: currentEra,
        hash: rawExtrinsic.hash.toString(),
        time: rawTimestamp.toNumber() / 1000,
        isSignedTransaction: rawExtrinsic.toHuman().isSigned,
        signature: rawExtrinsic.signature.toString(),
        signer: rawExtrinsic.signer.toString(),
        nonce: rawExtrinsic.nonce.toNumber(),
        method: rawExtrinsic.toHuman().method.method.toString(),
        section: rawExtrinsic.toHuman().method.section.toString(),
        args: rawExtrinsic.method.args.toString(),
        callArgs: callArgs,
        isSuccess: !!successEvent,
        partialFee: partialFee,
        tip: rawExtrinsic.tip,
        raw: JSON.stringify(rawExtrinsic.toHuman()),
        events: events,
    };
}

const getCallArgs = (args)  => {
    let callArgs = [];
    args.forEach((data) => {
        if (data.isEmpty) {
            return
        }
        if (Array.isArray(data)) {
            callArgs = getCallArgs(data)
            return
        }

        var method = data.method
        var section = data.section

        if (method == 'batch' || method == 'batchAll' || method == 'batch_all') {
            callArgs = getCallArgs(data.args)
            return
        }

        var value = data.args && data.args.toString()

        if (!value || !method || !section) {
            return
        }

        callArgs.push({value, method, section})
    })
    return callArgs;
}

module.exports = {
    toPb,
}
