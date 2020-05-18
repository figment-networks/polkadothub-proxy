const toPb = (rawEvent) => {
  const event = {
    data: rawEvent.event.data.toString(),
    method: rawEvent.event.method,
    section: rawEvent.event.section,
  }

  if (rawEvent.phase.isApplyExtrinsic) {
    event.phase = 'applyExtrinsic';
    event.extrinsicIndex = rawEvent.phase.asApplyExtrinsic.toNumber();
  } else if (rawEvent.phase.isFinalization) {
    event.phase = 'finalization';
  } else if (rawEvent.phase.isInitialization) {
    event.phase = 'initialization';
  } else {
    throw Error('unknown phase');
  }

  return event;
}

module.exports = {
  toPb,
}
