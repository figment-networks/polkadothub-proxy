const {ApiPromise, WsProvider} = require('@polkadot/api');

const createApi = async () => {
  const NODE_URL = process.env.NODE_URL || 'ws://localhost:9944';
  const wsProvider = new WsProvider(NODE_URL);
  return await ApiPromise.create({provider: wsProvider});
}

module.exports = {
  createApi,
};
