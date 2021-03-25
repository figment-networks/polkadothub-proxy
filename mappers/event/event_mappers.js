const toPb = (rawEvent) => {
  const types = rawEvent.event.typeDef;
  const eventData = getEventData(rawEvent, types);

  const event = {
    data: eventData,
    method: rawEvent.event.method,
    section: rawEvent.event.section,
    description: rawEvent.event.meta.documentation.toString(),
    raw: JSON.stringify(rawEvent.toHuman()),
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

function getEventData(rawEvent, types) {
  const eventData = [];
  rawEvent.event.data.forEach((data, index) => {
    eventData.push({
      name: types[index].type,
      value: data.toString(),
    })
  });
  return eventData;
}

module.exports = {
  toPb,
}
