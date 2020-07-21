// Import
const {ApiPromise, WsProvider} = require('@polkadot/api');

const {setupApiAtHeight} = require('../utils/setup');

const NODE_URL = 'ws://localhost:9944';
const HEIGHT = 2278813;

async function init() {
  const wsProvider = new WsProvider(NODE_URL);
  const api = await ApiPromise.create({provider: wsProvider});

  const {blockHash} = await setupApiAtHeight(api, HEIGHT);

  // EVENTS
  const eventsAt = await api.query.system.events.at(blockHash);

  eventsAt.forEach((record) => {
    // Extract the phase, event and the event types
    const { event, phase } = record;
    const types = event.typeDef;

    // Show what we are busy with
    console.log(`\t${event.section}:${event.method}:: (phase=${phase.toString()})`);
    console.log(`\t\t${event.meta.documentation.toString()}`);

    // Loop through each of the parameters, displaying the type and data
    event.data.forEach((data, index) => {
      console.log(`\t\t\t${types[index].type}: ${data.toString()}`);
    });
  });

  console.log('eventsAt: ', eventsAt.toHuman());
}

init().then(res => {
  console.log('Done')
}).catch(err => {
  console.log('ERROR', err)
});
