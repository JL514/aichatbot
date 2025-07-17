const cache = {};
const TTL = 60 * 10 * 1000; // 10 minutes
const MAX_KEY_LENGTH = 128;
const MAX_CACHE_SIZE = 1000;

function validateKey(key) {
  if (typeof key !== 'string' || key.length === 0 || key.length > MAX_KEY_LENGTH) {
    throw new Error('Invalid cache key');
  }
}

function validateTTL(ttl) {
  if (typeof ttl !== 'number' || ttl <= 0 || ttl > 24 * 60 * 60 * 1000) {
    throw new Error('Invalid cache TTL');
  }
}

function validateValue(value) {
  if (typeof value === 'undefined') throw new Error('Cannot cache undefined value');
}

function get(key) {
  validateKey(key);
  const entry = cache[key];
  if (!entry) return null;
  if (Date.now() > entry.expiry) {
    delete cache[key];
    return null;
  }
  return entry.value;
}

function set(key, value, ttl = TTL) {
  validateKey(key);
  validateValue(value);
  validateTTL(ttl);
  if (Object.keys(cache).length >= MAX_CACHE_SIZE) {
    // Simple eviction: clear all (could be improved with LRU)
    Object.keys(cache).forEach((k) => delete cache[k]);
  }
  cache[key] = { value, expiry: Date.now() + ttl };
}

function clear() {
  Object.keys(cache).forEach((k) => delete cache[k]);
}

module.exports = { get, set, clear };
