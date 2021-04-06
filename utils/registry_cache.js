


class TypeRegistryCache {
  constructor() {
    this.cache = new Map();
  }

  get(key) {
    return this.cache.get(key);
  }

  has(key) {
    return this.cache.has(key);
  }

  set(key, value) {
    return this.cache.set(key, value);
  }
}


var RegistryCache = new TypeRegistryCache();

module.exports = {
  RegistryCache
};
