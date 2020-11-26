
const getHashForHeight = async(api,height) => {
    return (!height || height === 0)
        ? await api.rpc.chain.getFinalizedHead()
        : await api.rpc.chain.getBlockHash(height);
}

module.exports = {
    getHashForHeight
};
  